import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'
import './Order.css'
import './Pages.css'

const MIN_PASSWORD = 8

function Signup() {
  const navigate = useNavigate()
  const { user, signup } = useAuth()
  const [form, setForm] = useState({ userId: '', name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (user && !submitting) return <Navigate to="/mypage" replace />

  const change = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    const userId = form.userId.trim()
    const name = form.name.trim()
    const email = form.email.trim()

    if (!userId || !name || !email || !form.password) {
      setError('모든 항목을 입력해 주세요.')
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('이메일 형식을 확인해 주세요.')
      return
    }
    if (form.password.length < MIN_PASSWORD) {
      setError(`비밀번호는 ${MIN_PASSWORD}자 이상으로 입력해 주세요.`)
      return
    }
    if (form.password !== form.confirm) {
      setError('비밀번호 확인이 일치하지 않아요.')
      return
    }

    setError('')
    setSubmitting(true)
    try {
      await signup({ userId, name, email, password: form.password })
      navigate('/mypage', { replace: true })
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <section className="order-page">
      <h2 className="order-page__title">회원가입</h2>
      <p className="page-demo-notice">
        시안용 회원가입이에요. 이 브라우저에만 저장되니 실제로 쓰는 비밀번호는 입력하지 마세요.
      </p>
      <form className="order-form" onSubmit={submit} noValidate>
        <label>
          아이디
          <input value={form.userId} onChange={change('userId')} autoComplete="username" />
        </label>
        <label>
          이름
          <input value={form.name} onChange={change('name')} autoComplete="name" />
        </label>
        <label>
          이메일
          <input type="email" value={form.email} onChange={change('email')} autoComplete="email" />
        </label>
        <label>
          비밀번호 ({MIN_PASSWORD}자 이상)
          <input type="password" value={form.password} onChange={change('password')} autoComplete="new-password" />
        </label>
        <label>
          비밀번호 확인
          <input type="password" value={form.confirm} onChange={change('confirm')} autoComplete="new-password" />
        </label>
        {error && <p className="order-error" role="alert">{error}</p>}
        <button type="submit" className="order-button" disabled={submitting}>가입하기</button>
      </form>
      <p className="page-link-row">이미 회원이신가요? <Link to="/login">로그인</Link></p>
    </section>
  )
}

export default Signup
