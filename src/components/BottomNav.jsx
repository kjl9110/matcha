import { useNavigate } from 'react-router-dom'
import { IoMenu, IoCart, IoPerson, IoEye, IoSearch } from 'react-icons/io5'
import CartLink from './CartLink.jsx'
import './BottomNav.css'

const items = [
  { label: '메뉴', Icon: IoMenu, path: '/menu' },
  { label: '장바구니', Icon: IoCart, isCart: true },
  { label: '마이페이지', Icon: IoPerson, path: '/mypage' },
  { label: '최근 본 상품', Icon: IoEye, path: '/recent' },
  { label: '검색', Icon: IoSearch, path: '/products?search=1' },
]

function BottomNav() {
  const navigate = useNavigate()

  return (
    <nav className="bottom-nav">
      {items.map(({ label, Icon, isCart, path }) =>
        isCart ? (
          <CartLink key={label} icon={<Icon />} />
        ) : (
          <button
            key={label}
            type="button"
            aria-label={label}
            onClick={() => navigate(path)}
          >
            <Icon />
          </button>
        ),
      )}
    </nav>
  )
}

export default BottomNav
