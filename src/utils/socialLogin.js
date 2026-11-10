// 간편 로그인: 각 회사 로그인 화면 주소 만들기
// 공개 ID는 서버 함수(api/oauth.js)가 환경변수에서 읽어 알려줌 — Vercel에 VITE_ 이름 없이 등록 가능
export const STATE_KEY = 'matcha-oauth-state'
export const RETURN_KEY = 'matcha-oauth-return'

export const SOCIAL_PROVIDERS = {
  kakao: {
    label: '카카오',
    authorizeUrl: 'https://kauth.kakao.com/oauth/authorize',
    extra: {},
  },
  naver: {
    label: '네이버',
    authorizeUrl: 'https://nid.naver.com/oauth2.0/authorize',
    extra: {},
  },
  google: {
    label: '구글',
    authorizeUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    extra: { scope: 'openid email profile', prompt: 'select_account' },
  },
}

export const redirectUriFor = (provider) => `${window.location.origin}/auth/${provider}`

// 로그인 화면으로 이동. 실패하면 이유를 담은 오류를 던짐
export async function startSocialLogin(provider, returnTo = '/mypage') {
  const config = SOCIAL_PROVIDERS[provider]

  let clientId
  try {
    const response = await fetch(`/api/oauth?provider=${provider}`)
    const body = await response.json()
    clientId = body.clientId
  } catch {
    clientId = null
  }
  if (!clientId) throw new Error(`${config.label} 로그인 키가 아직 설정되지 않았어요.`)

  // 다른 사이트가 로그인 결과를 끼워 넣지 못하게 무작위 값으로 확인
  const state = crypto.getRandomValues(new Uint32Array(4)).join('-')
  sessionStorage.setItem(STATE_KEY, `${provider}:${state}`)
  sessionStorage.setItem(RETURN_KEY, returnTo)

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUriFor(provider),
    state,
    ...config.extra,
  })
  window.location.assign(`${config.authorizeUrl}?${params}`)
}
