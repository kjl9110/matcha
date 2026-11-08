import { Link } from 'react-router-dom'
import './CouponBanner.css'

function CouponBanner() {
  return (
    <section className="coupon-banner">
      <Link to="/events/free-shipping">
        <img src="/images/event 01.png" alt="대한다원 이벤트 배송비 0원, 5만 원 이상 구매 시" />
      </Link>
    </section>
  )
}

export default CouponBanner
