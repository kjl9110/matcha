import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'
import './Order.css'
import './Pages.css'

const MIN_PASSWORD = 8

function FindId() {
  const { findId } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const found = findId(name.trim(), email.trim())
    setMessage(found ? `찾으신 아이디는 ${found} 입니다.` : '입력한 정보와 일치하는 회원이 없어요.')
  }

  return (
    <form className="order-form" onSubmit={submit} noValidate>
      <label>
        이름
        <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
      </label>
      <label>
        이메일
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
      </label>
      {message && <p className="order-notice" role="status">{message}</p>}
      <button type="submit" className="order-button">아이디 찾기</button>
    </form>
  )
}

function ResetPassword() {
  const { resetPassword } = useAuth()
  const [form, setForm] = useState({ userId: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const change = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setDone(false)
    if (form.password.length < MIN_PASSWORD) {
      setError(`새 비밀번호는 ${MIN_PASSWORD}자 이상으로 입력해 주세요.`)
      return
    }
    try {
      await resetPassword(form.userId.trim(), form.email.trim(), form.password)
      setError('')
      setDone(true)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form className="order-form" onSubmit={submit} noValidate>
      <label>
        아이디
        <input value={form.userId} onChange={change('userId')} autoComplete="username" />
      </label>
      <label>
        이메일
        <input type="email" value={form.email} onChange={change('email')} autoComplete="email" />
      </label>
      <label>
        새 비밀번호 ({MIN_PASSWORD}자 이상)
        <input type="password" value={form.password} onChange={change('password')} autoComplete="new-password" />
      </label>
      {error && <p className="order-error" role="alert">{error}</p>}
      {done && <p className="order-notice" role="status">비밀번호를 바꿨어요. 새 비밀번호로 로그인해 주세요.</p>}
      <button type="submit" className="order-button">비밀번호 바꾸기</button>
    </form>
  )
}

function FindAccount() {
  const [params] = useSearchParams()
  const isPassword = params.get('type') === 'password'

  return (
    <section className="order-page">
      <h2 className="order-page__title">{isPassword ? '비밀번호 찾기' : '아이디 찾기'}</h2>
      {isPassword ? <ResetPassword /> : <FindId />}
      <p className="page-link-row">
        <Link to={isPassword ? '/find-account?type=id' : '/find-account?type=password'}>
          {isPassword ? '아이디 찾기' : '비밀번호 찾기'}
        </Link>
        {' · '}
        <Link to="/login">로그인</Link>
      </p>
    </section>
  )
}

export default FindAccount
