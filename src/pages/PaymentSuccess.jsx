import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { IoCheckmarkCircle, IoAlertCircle } from 'react-icons/io5'
import { useCart } from '../context/useCart.js'
import { PENDING_ORDER_KEY } from '../utils/order.js'
import { ORDERS_KEY, prependItem } from '../utils/localStore.js'
import './Order.css'

function readPending() {
  try {
    return JSON.parse(sessionStorage.getItem(PENDING_ORDER_KEY))
  } catch {
    return null
  }
}

function PaymentSuccess() {
  const [params] = useSearchParams()
  const { clearCart } = useCart()
  const [pending] = useState(readPending)
  const [result, setResult] = useState(null)
  const [confirmError, setConfirmError] = useState('')
  const requested = useRef(false)

  const paymentKey = params.get('paymentKey')
  const orderId = params.get('orderId')
  const amount = Number(params.get('amount'))

  // 결제창에서 돌아온 값이 주문서에서 보낸 값과 같은지 확인
  const isValid = Boolean(paymentKey && pending && pending.orderId === orderId && pending.total === amount)
  const error = isValid ? confirmError : '주문 정보가 일치하지 않습니다. 다시 주문해주세요.'

  useEffect(() => {
    // 개발 모드(StrictMode)에서 두 번 승인 요청하지 않도록
    if (!isValid || requested.current) return
    requested.current = true

    fetch('/api/confirm-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentKey, orderId, amount, items: pending.items }),
    })
      .then(async (response) => {
        const body = await response.json().catch(() => ({}))
        if (!response.ok) throw new Error(body.message || '결제 승인에 실패했습니다.')
        sessionStorage.removeItem(PENDING_ORDER_KEY)
        if (pending.fromCart) clearCart()
        prependItem(ORDERS_KEY, body) // 마이페이지 주문 내역
        setResult(body)
      })
      .catch((err) => {
        setConfirmError(
          err.message === 'Failed to fetch'
            ? '결제 승인 서버에 연결하지 못했습니다.'
            : err.message,
        )
      })
  }, [isValid, paymentKey, orderId, amount, pending, clearCart])

  if (error) {
    return (
      <section className="order-page order-result">
        <IoAlertCircle className="order-result__icon order-result__icon--fail" aria-hidden="true" />
        <h2 className="order-page__title">결제를 완료하지 못했습니다</h2>
        <p>{error}</p>
        <Link to="/cart" className="order-button">장바구니로 가기</Link>
      </section>
    )
  }

  if (!result) {
    return (
      <section className="order-page order-result">
        <p>결제를 승인하는 중입니다…</p>
      </section>
    )
  }

  return (
    <section className="order-page order-result">
      <IoCheckmarkCircle className="order-result__icon" aria-hidden="true" />
      <h2 className="order-page__title">주문이 완료되었습니다</h2>
      <dl className="order-summary">
        <div>
          <dt>주문번호</dt>
          <dd>{result.orderId}</dd>
        </div>
        <div>
          <dt>주문상품</dt>
          <dd>{result.orderName}</dd>
        </div>
        <div>
          <dt>결제수단</dt>
          <dd>{result.method}</dd>
        </div>
        <div className="order-summary__total">
          <dt>결제금액</dt>
          <dd>{result.totalAmount.toLocaleString()}원</dd>
        </div>
      </dl>
      <p className="order-test-notice">테스트 결제라 실제로 청구되지 않습니다.</p>
      <Link to="/" className="order-button">쇼핑 계속하기</Link>
    </section>
  )
}

export default PaymentSuccess
