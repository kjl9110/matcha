import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart.js'
import './CartLink.css'

// 장바구니 아이콘 + 담은 개수 배지 (헤더·하단 네비 공통)
function CartLink({ icon, className = '' }) {
  const { count } = useCart()

  return (
    <Link
      to="/cart"
      className={`cart-link ${className}`}
      aria-label={count > 0 ? `장바구니 (${count}개)` : '장바구니'}
    >
      {icon}
      {count > 0 && (
        <span className="cart-link__badge" aria-hidden="true">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  )
}

export default CartLink
