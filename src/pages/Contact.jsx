import { useState } from 'react'
import { INQUIRIES_KEY, prependItem, readList } from '../utils/localStore.js'
import './Order.css'
import './Pages.css'

const EMPTY_FORM = { name: '', phone: '', message: '' }

function Contact() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [inquiries, setInquiries] = useState(() => readList(INQUIRIES_KEY))
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const change = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    setSent(false)
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setError('이름, 연락처, 문의 내용을 모두 입력해 주세요.')
      return
    }
    setError('')
    setInquiries(prependItem(INQUIRIES_KEY, {
      id: `${Date.now()}`,
      name: form.name.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
      createdAt: new Date().toISOString(),
    }))
    setForm(EMPTY_FORM)
    setSent(true)
  }

  return (
    <section className="order-page">
      <h2 className="order-page__title">문의하기</h2>
      <p className="page-demo-notice">
        시안이라 담당자에게 전달되지 않고 이 브라우저에만 저장돼요.
      </p>
      <form className="order-form" onSubmit={submit} noValidate>
        <label>
          이름
          <input value={form.name} onChange={change('name')} autoComplete="name" />
        </label>
        <label>
          연락처
          <input value={form.phone} onChange={change('phone')} inputMode="tel" autoComplete="tel" />
        </label>
        <label>
          문의 내용
          <textarea className="page-textarea" rows="5" value={form.message} onChange={change('message')} />
        </label>
        {error && <p className="order-error" role="alert">{error}</p>}
        {sent && <p className="order-notice" role="status">문의를 저장했어요.</p>}
        <button type="submit" className="order-button">문의 남기기</button>
      </form>

      {inquiries.length > 0 && (
        <>
          <h3 className="page-heading">내 문의 ({inquiries.length})</h3>
          <ul className="page-list">
            {inquiries.map(({ id, message, createdAt }) => (
              <li key={id} className="page-inquiry">
                <time dateTime={createdAt}>{createdAt.slice(0, 10)}</time>
                <p>{message}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}

export default Contact
