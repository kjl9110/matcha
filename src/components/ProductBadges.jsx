import './ProductBadges.css'

// 인기상품 = badge가 BEST, 무료배송 = 배송비 0원
function ProductBadges({ product }) {
  const { badge, shippingFee } = product

  if (badge !== 'BEST' && shippingFee !== 0) return null

  return (
    <div className="product-badges">
      {badge === 'BEST' && <span className="badge badge--pink">인기상품♬</span>}
      {shippingFee === 0 && <span className="badge badge--purple">무료배송♬</span>}
    </div>
  )
}

export default ProductBadges
