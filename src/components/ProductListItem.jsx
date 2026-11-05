import { Link } from 'react-router-dom'
import { IoBasketOutline, IoHeartOutline } from 'react-icons/io5'
import { useCart } from '../context/useCart.js'
import ProductBadges from './ProductBadges.jsx'
import './ProductListItem.css'

// 가로형 상품 한 줄 (왼쪽 이미지 + 오른쪽 정보 + 장바구니·찜)
function ProductListItem({ product }) {
  const { id, image, alt, title, salePrice, hashtags } = product
  const { addItem } = useCart()

  return (
    <li className="product-item">
      <Link to={`/product/${id}`} className="product-item__link">
        <img src={`/${image}`} alt={alt} />
        <div className="product-item__info">
          <p className="product-item__title">{title}</p>
          <p className="product-item__price">{salePrice.toLocaleString()}원</p>
          <p className="product-item__tags">{hashtags.join(' ')}</p>
          <ProductBadges product={product} />
        </div>
      </Link>
      <div className="product-item__actions">
        <button type="button" aria-label={`${title} 장바구니 담기`} onClick={() => addItem(id)}>
          <IoBasketOutline />
        </button>
        <button type="button" aria-label={`${title} 찜하기`}><IoHeartOutline /></button>
      </div>
    </li>
  )
}

export default ProductListItem
