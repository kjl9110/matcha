import { Link } from 'react-router-dom'
import './Order.css'

function NotFound() {
  return (
    <section className="order-page order-empty">
      <h2 className="order-page__title">페이지를 찾을 수 없습니다</h2>
      <p>주소가 바뀌었거나 없는 페이지예요.</p>
      <Link to="/" className="order-button">메인으로 가기</Link>
    </section>
  )
}

export default NotFound
