import './ProductBadges.css'

// 인기상품 = badge가 BEST, 무료배송 = 배송비 0원
// 상품명 위에 두므로, 뱃지가 없어도 같은 높이를 비워 카드끼리 줄을 맞춤
function ProductBadges({ product }) {
  const { badge, shippingFee } = product

  return (
    <div className="product-badges">
      {badge === 'BEST' && <span className="badge badge--pink">인기상품♬</span>}
      {shippingFee === 0 && <span className="badge badge--purple">무료배송♬</span>}
    </div>
  )
}

export default ProductBadges
