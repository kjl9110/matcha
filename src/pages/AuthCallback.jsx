import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'
import { SOCIAL_PROVIDERS, STATE_KEY, RETURN_KEY, redirectUriFor } from '../utils/socialLogin.js'
import './Login.css'

// 카카오·네이버·구글 로그인 후 돌아오는 화면 (/auth/:provider)
function AuthCallback() {
  const { provider } = useParams()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { socialLogin } = useAuth()
  const [savedState] = useState(() => sessionStorage.getItem(STATE_KEY))
  const [serverError, setServerError] = useState('')
  const requested = useRef(false)

  const label = SOCIAL_PROVIDERS[provider]?.label ?? '간편'
  const code = params.get('code')
  const state = params.get('state')
  const denied = params.get('error')

  // 화면에서 바로 알 수 있는 오류는 렌더링 중에 판단
  let error = serverError
  if (!SOCIAL_PROVIDERS[provider]) error = '지원하지 않는 로그인 방식입니다.'
  else if (denied) error = `${label} 로그인을 취소했거나 동의하지 않았습니다.`
  else if (!code || savedState !== `${provider}:${state}`) error = '로그인 정보가 맞지 않습니다. 다시 시도해 주세요.'

  useEffect(() => {
    if (error || requested.current) return
    requested.current = true
    sessionStorage.removeItem(STATE_KEY)

    fetch('/api/oauth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider, code, state, redirectUri: redirectUriFor(provider) }),
    })
      .then(async (response) => {
        const body = await response.json().catch(() => ({}))
        if (!response.ok) throw new Error(body.message || `${label} 로그인에 실패했습니다.`)
        socialLogin(body)
        const returnTo = sessionStorage.getItem(RETURN_KEY) || '/mypage'
        sessionStorage.removeItem(RETURN_KEY)
        navigate(returnTo, { replace: true })
      })
      .catch((err) => {
        setServerError(
          err.message === 'Failed to fetch' ? '로그인 서버에 연결하지 못했습니다.' : err.message,
        )
      })
  }, [error, provider, code, state, label, socialLogin, navigate])

  return (
    <section className="login">
      <div className="login__panel login__callback">
        {error ? (
          <>
            <p className="login__notice" role="alert">{error}</p>
            <Link to="/login" className="login__submit">로그인 화면으로</Link>
          </>
        ) : (
          <p className="login__notice" role="status">{label} 계정으로 로그인하는 중입니다…</p>
        )}
      </div>
    </section>
  )
}

export default AuthCallback
