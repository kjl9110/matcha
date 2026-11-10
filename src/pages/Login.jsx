import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'
import { RiKakaoTalkFill } from 'react-icons/ri'
import { SiNaver } from 'react-icons/si'
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '../context/useAuth.js'
import { SOCIAL_PROVIDERS, startSocialLogin } from '../utils/socialLogin.js'
import './Login.css'

const EXTRA_LINKS = [
  { label: '아이디 찾기', to: '/find-account?type=id' },
  { label: '비밀번호 찾기', to: '/find-account?type=password' },
  { label: '회원가입', to: '/signup' },
]
// 간편 로그인 (키는 .env.local · Vercel 환경변수에 등록)
const SOCIAL_LOGINS = [
  { provider: 'kakao', label: '카카오로 계속하기', Icon: RiKakaoTalkFill },
  { provider: 'naver', label: '네이버로 계속하기', Icon: SiNaver },
  { provider: 'google', label: '구글로 계속하기', Icon: FcGoogle },
]

function Login() {
  const navigate = useNavigate()
  const { user, login } = useAuth()
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [notice, setNotice] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (user && !submitting) return <Navigate to="/mypage" replace />

  const handleSocial = async (provider) => {
    setErrors({})
    setNotice(`${SOCIAL_PROVIDERS[provider].label} 로그인 화면으로 이동하는 중…`)
    try {
      await startSocialLogin(provider)
    } catch (err) {
      setNotice(err.message)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setNotice('')
    const nextErrors = {}
    if (!userId.trim()) nextErrors.userId = '아이디를 입력해 주세요.'
    if (!password) nextErrors.password = '비밀번호를 입력해 주세요.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)
    try {
      await login(userId.trim(), password)
      navigate('/mypage', { replace: true })
    } catch (err) {
      setNotice(err.message)
      setSubmitting(false)
    }
  }

  return (
    <section className="login">
      <div className="login__hero">
        <p className="login__brand">대한다원 보성녹차밭</p>
        <h2 className="login__title">다시 찾아 주셔서{'\n'}반갑습니다</h2>
        <p className="login__subtitle">오늘의 차 한 잔을 이어 가세요</p>
      </div>

      <div className="login__panel">
        <form onSubmit={handleSubmit} noValidate>
          <div className="login__field">
            <label htmlFor="login-id">아이디</label>
            <input
              id="login-id"
              type="text"
              autoComplete="username"
              placeholder="아이디를 입력해 주세요"
              value={userId}
              aria-invalid={Boolean(errors.userId)}
              aria-describedby={errors.userId ? 'login-id-error' : undefined}
              onChange={(event) => setUserId(event.target.value)}
            />
            {errors.userId && <p id="login-id-error" className="login__error">{errors.userId}</p>}
          </div>

          <div className="login__field">
            <label htmlFor="login-password">비밀번호</label>
            <div className="login__password">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="비밀번호를 입력해 주세요"
                value={password}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'login-password-error' : undefined}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                type="button"
                aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>
            {errors.password && (
              <p id="login-password-error" className="login__error">{errors.password}</p>
            )}
          </div>

          <button type="submit" className="login__submit" disabled={submitting}>로그인</button>
        </form>

        <p className="login__notice" role="status">{notice}</p>

        <ul className="login__links">
          {EXTRA_LINKS.map(({ label, to }) => (
            <li key={label}>
              <Link to={to}>{label}</Link>
            </li>
          ))}
        </ul>

        <p className="login__divider"><span>간편 로그인</span></p>

        <div className="login__socials">
          {SOCIAL_LOGINS.map(({ provider, label, Icon }) => (
            <button
              key={provider}
              type="button"
              className={`login__social login__social--${provider}`}
              onClick={() => handleSocial(provider)}
            >
              <Icon aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        <p className="login__benefit">회원 가입 시 2천원 쿠폰을 드려요</p>
      </div>
    </section>
  )
}

export default Login
