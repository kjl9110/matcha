// 주문 금액 계산 — 화면과 결제 승인 서버(api/confirm-payment.js)가 같이 씀
export const FREE_SHIPPING_MIN = 50000
export const SHIPPING_FEE = 3000
export const MAX_QUANTITY = 99
// 결제 완료 화면에서 금액·상품을 다시 확인하기 위해 sessionStorage에 잠시 보관하는 키
export const PENDING_ORDER_KEY = 'matcha-pending-order'

// items: [{ id, quantity }], products: 상품 JSON의 products
export function calcOrder(items, products) {
  const lines = items
    .map(({ id, quantity }) => {
      const product = products.find((item) => item.id === id)
      return product ? { product, quantity, total: product.salePrice * quantity } : null
    })
    .filter(Boolean)

  const subtotal = lines.reduce((sum, line) => sum + line.total, 0)
  // 5만 원 이상이거나 무료배송 상품만 담았으면 배송비 0원
  const allFree = lines.length > 0 && lines.every((line) => line.product.shippingFee === 0)
  const shipping = lines.length === 0 || subtotal >= FREE_SHIPPING_MIN || allFree ? 0 : SHIPPING_FEE

  return { lines, subtotal, shipping, total: subtotal + shipping }
}

// 예: "녹차라떼 스틱 16개입 외 2건"
export function makeOrderName(lines) {
  if (lines.length === 0) return ''
  const first = lines[0].product.title
  return lines.length === 1 ? first : `${first} 외 ${lines.length - 1}건`
}

export function isValidItems(items) {
  return (
    Array.isArray(items) &&
    items.length > 0 &&
    items.length <= 50 &&
    items.every(
      ({ id, quantity }) =>
        typeof id === 'string' &&
        Number.isInteger(quantity) &&
        quantity >= 1 &&
        quantity <= MAX_QUANTITY,
    )
  )
}
