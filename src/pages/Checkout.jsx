import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk'
import data from '../data/daehandawon_products.json'
import { useCart } from '../context/useCart.js'
import { calcOrder, makeOrderName, PENDING_ORDER_KEY } from '../utils/order.js'
import OrderSummary from '../components/OrderSummary.jsx'
import './Order.css'

const makeOrderId = () =>
  `DH-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`

function Checkout() {
  const { state } = useLocation()
  const cart = useCart()
  // 상세페이지 '구매하기'로 오면 그 상품만, 아니면 장바구니 전체
  const directItems = state?.items
  const items = directItems ?? cart.items
  const order = calcOrder(items, data.products)

  const [form, setForm] = useState({ name: '', phone: '', address: '' })
  const [error, setError] = useState('')
  const [paying, setPaying] = useState(false)

  if (order.lines.length === 0) {
    return (
      <section className="order-page order-empty">
        <h2 className="order-page__title">주문서</h2>
        <p>주문할 상품이 없습니다.</p>
        <Link to="/" className="order-button">쇼핑하러 가기</Link>
      </section>
    )
  }

  const change = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const pay = async (e) => {
    e.preventDefault()
    setError('')

    const phone = form.phone.replace(/\D/g, '')
    if (!form.name.trim() || !form.address.trim()) {
      setError('이름과 주소를 입력해주세요.')
      return
    }
    if (phone.length < 9 || phone.length > 11) {
      setError('연락처를 숫자로 정확히 입력해주세요.')
      return
    }

    const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY
    if (!clientKey) {
      setError('결제 키가 설정되지 않았습니다. (.env.local의 VITE_TOSS_CLIENT_KEY)')
      return
    }

    const orderId = makeOrderId()
    const orderItems = order.lines.map(({ product, quantity }) => ({ id: product.id, quantity }))
    sessionStorage.setItem(
      PENDING_ORDER_KEY,
      JSON.stringify({ orderId, items: orderItems, total: order.total, fromCart: !directItems }),
    )

    setPaying(true)
    try {
      const tossPayments = await loadTossPayments(clientKey)
      const payment = tossPayments.payment({ customerKey: ANONYMOUS })
      await payment.requestPayment({
        method: 'CARD',
        amount: { currency: 'KRW', value: order.total },
        orderId,
        orderName: makeOrderName(order.lines),
        customerName: form.name.trim(),
        customerMobilePhone: phone,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      })
    } catch (err) {
      // 결제창을 닫은 경우 등
      setError(err?.code === 'USER_CANCEL' ? '결제를 취소했습니다.' : err?.message || '결제창을 열지 못했습니다.')
      setPaying(false)
    }
  }

  return (
    <section className="order-page">
      <h2 className="order-page__title">주문서</h2>

      <form className="order-form" onSubmit={pay} noValidate>
        <h3>주문자 정보</h3>
        <label>
          이름
          <input value={form.name} onChange={change('name')} autoComplete="name" required />
        </label>
        <label>
          연락처
          <input
            value={form.phone}
            onChange={change('phone')}
            inputMode="numeric"
            autoComplete="tel"
            placeholder="01012345678"
            required
          />
        </label>
        <label>
          주소
          <input value={form.address} onChange={change('address')} autoComplete="street-address" required />
        </label>

        <h3>주문 상품 ({order.lines.length})</h3>
        <ul className="order-brief">
          {order.lines.map(({ product, quantity, total }) => (
            <li key={product.id}>
              <span>{product.title} × {quantity}</span>
              <span>{total.toLocaleString()}원</span>
            </li>
          ))}
        </ul>

        <OrderSummary order={order} />

        <p className="order-test-notice">
          포트폴리오용 <strong>테스트 결제</strong>입니다. 결제창이 열려도 실제 돈은 빠져나가지 않습니다.
        </p>

        {error && <p className="order-error" role="alert">{error}</p>}

        <button type="submit" className="order-button" disabled={paying}>
          {paying ? '결제창 여는 중…' : `${order.total.toLocaleString()}원 결제하기`}
        </button>
      </form>
    </section>
  )
}

export default Checkout
