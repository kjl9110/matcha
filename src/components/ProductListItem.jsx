import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IoBasket, IoBasketOutline, IoHeart, IoHeartOutline } from 'react-icons/io5'
import { useCart } from '../context/useCart.js'
import { useWishlist } from '../context/useWishlist.js'
import ProductBadges from './ProductBadges.jsx'
import './ProductListItem.css'

const TOAST_MS = 2000
const TOASTS = {
  cart: { text: '장바구니에 담았어요', to: '/cart' },
  wish: { text: '찜 목록에 담았어요', to: '/wishlist' },
  unwish: { text: '찜을 해제했어요', to: '/wishlist' },
}

// 가로형 상품 한 줄 (왼쪽 이미지 + 오른쪽 정보, 정보 아래 장바구니·찜)
function ProductListItem({ product }) {
  const { id, image, alt, title, salePrice, hashtags } = product
  const { items, addItem } = useCart()
  const { isWished, toggleWish } = useWishlist()
  const wished = isWished(id)
  const inCart = items.some((item) => item.id === id)
  const [toast, setToast] = useState(null)

  // 알림을 잠깐 보여 줌 (다시 누르면 시간을 새로 셈)
  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(() => setToast(null), TOAST_MS)
    return () => clearTimeout(timer)
  }, [toast])

  const addToCart = () => {
    addItem(id)
    setToast({ ...TOASTS.cart, at: Date.now() })
  }

  const toggleWishWithToast = () => {
    toggleWish(id)
    setToast({ ...(wished ? TOASTS.unwish : TOASTS.wish), at: Date.now() })
  }

  return (
    <li className="product-item">
      <Link to={`/product/${id}`} className="product-item__image" tabIndex={-1} aria-hidden="true">
        <img src={`/${image}`} alt={alt} />
      </Link>
      <div className="product-item__info">
        <Link to={`/product/${id}`} className="product-item__link">
          <ProductBadges product={product} />
          <p className="product-item__title">{title}</p>
          <p className="product-item__price">{salePrice.toLocaleString()}원</p>
          <p className="product-item__tags">{hashtags.join(' ')}</p>
        </Link>
        <div className="product-item__actions">
          <button
            type="button"
            className={inCart ? 'is-added' : ''}
            aria-label={`${title} 장바구니 담기`}
            onClick={addToCart}
          >
            {inCart ? <IoBasket /> : <IoBasketOutline />}
          </button>
          <button
            type="button"
            className={wished ? 'is-wished' : ''}
            aria-label={`${title} 찜하기`}
            aria-pressed={wished}
            onClick={toggleWishWithToast}
          >
            {wished ? <IoHeart /> : <IoHeartOutline />}
          </button>
        </div>
      </div>
      {toast && (
        <p className="product-item__toast" role="status">
          {toast.text} <Link to={toast.to}>보러 가기</Link>
        </p>
      )}
    </li>
  )
}

export default ProductListItem
