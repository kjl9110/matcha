import { Link, useSearchParams } from 'react-router-dom'
import { IoCloseCircle } from 'react-icons/io5'
import './Order.css'

function PaymentFail() {
  const [params] = useSearchParams()
  const code = params.get('code')
  const message = params.get('message')

  return (
    <section className="order-page order-result">
      <IoCloseCircle className="order-result__icon order-result__icon--fail" aria-hidden="true" />
      <h2 className="order-page__title">
        {code === 'PAY_PROCESS_CANCELED' ? '결제를 취소했습니다' : '결제에 실패했습니다'}
      </h2>
      {message && <p>{message}</p>}
      {code && <p className="order-result__code">오류 코드: {code}</p>}
      <Link to="/checkout" className="order-button">다시 결제하기</Link>
    </section>
  )
}

export default PaymentFail
