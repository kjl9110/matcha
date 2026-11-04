import { IoMenu, IoCart, IoPerson, IoEye, IoSearch } from 'react-icons/io5'
import './BottomNav.css'

const items = [
  { label: '메뉴', Icon: IoMenu },
  { label: '장바구니', Icon: IoCart },
  { label: '마이페이지', Icon: IoPerson },
  { label: '최근 본 상품', Icon: IoEye },
  { label: '검색', Icon: IoSearch },
]

function BottomNav() {
  return (
    <nav className="bottom-nav">
      {items.map(({ label, Icon }) => (
        <button key={label} type="button" aria-label={label}>
          <Icon />
        </button>
      ))}
    </nav>
  )
}

export default BottomNav
