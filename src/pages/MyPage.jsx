import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { IoChevronForward } from 'react-icons/io5'
import { useAuth } from '../context/useAuth.js'
import { ORDERS_KEY, readList } from '../utils/localStore.js'
import './Order.css'
import './Pages.css'

const PROVIDER_LABELS = { kakao: '카카오', naver: '네이버', google: '구글' }

const MENU = [
  { label: '장바구니', to: '/cart' },
  { label: '찜한 상품', to: '/wishlist' },
  { label: '최근 본 상품', to: '/recent' },
  { label: '문의하기', to: '/contact' },
]

function MyPage() {
  const { user, logout } = useAuth()
  const [orders] = useState(() => readList(ORDERS_KEY))
  const [loggedOut, setLoggedOut] = useState(false)

  // 직접 로그아웃했으면 메인으로, 로그인 없이 들어왔으면 로그인 페이지로
  if (!user) return <Navigate to={loggedOut ? '/' : '/login'} replace />

  const handleLogout = () => {
    setLoggedOut(true)
    logout()
  }

  return (
    <section className="order-page">
      <h2 className="order-page__title">{user.name}님, 반갑습니다</h2>
      <p className="page-sub">
        {user.provider ? `${PROVIDER_LABELS[user.provider]} 계정` : user.userId}
        {user.email && ` · ${user.email}`}
      </p>

      <div className="page-coupon">
        <strong>회원 가입 쿠폰 2,000원</strong>
        <p>쿠폰 적용 결제는 회원 서버를 연결한 뒤 사용할 수 있어요.</p>
      </div>

      <h3 className="page-heading">주문 내역</h3>
      {orders.length === 0 ? (
        <p className="page-empty">아직 주문 내역이 없어요.</p>
      ) : (
        <ul className="page-list">
          {orders.map((order) => (
            <li key={order.orderId} className="page-order">
              <strong>{order.orderName}</strong>
              <span>{order.totalAmount.toLocaleString()}원 · {order.method}</span>
              <span>{order.approvedAt?.slice(0, 10)}</span>
            </li>
          ))}
        </ul>
      )}

      <ul className="page-menu">
        {MENU.map(({ label, to }) => (
          <li key={to}>
            <Link to={to}>{label}<IoChevronForward aria-hidden="true" /></Link>
          </li>
        ))}
      </ul>

      <button type="button" className="page-text-button" onClick={handleLogout}>로그아웃</button>
    </section>
  )
}

export default MyPage
