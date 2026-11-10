// Vercel 서버 함수: 카카오·네이버·구글 간편 로그인
// 로그인 화면에서 받은 code를 비밀 키로 토큰과 바꾸고, 이름·이메일만 돌려줌
// 비밀 키는 환경변수에서만 읽음 (코드·GitHub에 넣지 않음)

// 이 주소들로 돌아오는 요청만 처리 (각 개발자센터에 같은 주소를 등록해야 함)
const ALLOWED_ORIGINS = [
  'https://matcha-market.vercel.app',
  'https://matcha-six-sand.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
]

const form = (params) => new URLSearchParams(params).toString()

async function readJson(response, step) {
  const body = await response.json().catch(() => ({}))
  if (!response.ok || body.error) {
    const reason = body.error_description || body.error || body.msg || response.status
    throw new Error(`${step} 실패: ${reason}`)
  }
  return body
}

// 공개 키(로그인 화면 주소에 들어가는 ID)도 서버 환경변수에서 읽어 화면에 알려줌
const CLIENT_ID_ENV = { kakao: 'KAKAO_REST_API_KEY', naver: 'NAVER_CLIENT_ID', google: 'GOOGLE_CLIENT_ID' }

const providers = {
  kakao: {
    env: ['KAKAO_REST_API_KEY'],
    async getProfile({ code, redirectUri }) {
      const token = await readJson(
        await fetch('https://kauth.kakao.com/oauth/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          body: form({
            grant_type: 'authorization_code',
            client_id: process.env.KAKAO_REST_API_KEY,
            redirect_uri: redirectUri,
            code,
            // 카카오 '클라이언트 시크릿'을 켰을 때만 필요
            ...(process.env.KAKAO_CLIENT_SECRET && { client_secret: process.env.KAKAO_CLIENT_SECRET }),
          }),
        }),
        '카카오 토큰 발급',
      )
      const me = await readJson(
        await fetch('https://kapi.kakao.com/v2/user/me', {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        '카카오 회원 정보 조회',
      )
      return {
        id: String(me.id),
        name: me.kakao_account?.profile?.nickname || me.properties?.nickname || '카카오 회원',
        email: me.kakao_account?.email || '',
      }
    },
  },

  naver: {
    env: ['NAVER_CLIENT_ID', 'NAVER_CLIENT_SECRET'],
    async getProfile({ code, state }) {
      const token = await readJson(
        await fetch('https://nid.naver.com/oauth2.0/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
          body: form({
            grant_type: 'authorization_code',
            client_id: process.env.NAVER_CLIENT_ID,
            client_secret: process.env.NAVER_CLIENT_SECRET,
            code,
            state,
          }),
        }),
        '네이버 토큰 발급',
      )
      const me = await readJson(
        await fetch('https://openapi.naver.com/v1/nid/me', {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        '네이버 회원 정보 조회',
      )
      const profile = me.response ?? {}
      return {
        id: String(profile.id),
        name: profile.name || profile.nickname || '네이버 회원',
        email: profile.email || '',
      }
    },
  },

  google: {
    env: ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'],
    async getProfile({ code, redirectUri }) {
      const token = await readJson(
        await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: form({
            grant_type: 'authorization_code',
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: redirectUri,
            code,
          }),
        }),
        '구글 토큰 발급',
      )
      const me = await readJson(
        await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
          headers: { Authorization: `Bearer ${token.access_token}` },
        }),
        '구글 회원 정보 조회',
      )
      return { id: String(me.sub), name: me.name || '구글 회원', email: me.email || '' }
    },
  },
}

export default async function handler(req, res) {
  // GET ?provider=google → 로그인 화면 주소에 넣을 공개 ID만 알려줌
  if (req.method === 'GET') {
    const name = CLIENT_ID_ENV[req.query?.provider]
    const clientId = name && process.env[name]
    if (!clientId) return res.status(404).json({ message: '로그인 키가 아직 설정되지 않았어요.' })
    return res.status(200).json({ clientId })
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ message: 'GET·POST 요청만 받습니다.' })
  }

  const { provider, code, state, redirectUri } = req.body ?? {}
  const config = providers[provider]
  if (!config || typeof code !== 'string' || typeof redirectUri !== 'string') {
    return res.status(400).json({ message: '로그인 정보가 올바르지 않습니다.' })
  }

  let origin
  try {
    origin = new URL(redirectUri).origin
  } catch {
    origin = ''
  }
  if (!ALLOWED_ORIGINS.includes(origin) || new URL(redirectUri).pathname !== `/auth/${provider}`) {
    return res.status(400).json({ message: '허용되지 않은 주소입니다.' })
  }

  const missing = config.env.filter((name) => !process.env[name])
  if (missing.length > 0) {
    return res.status(500).json({ message: `서버에 ${missing.join(', ')} 설정이 없습니다.` })
  }

  try {
    const profile = await config.getProfile({ code, state, redirectUri })
    return res.status(200).json({ provider, ...profile })
  } catch (err) {
    return res.status(400).json({ message: err.message })
  }
}
