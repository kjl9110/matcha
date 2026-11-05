// 상품금액 · 배송비 · 총 결제금액 표
function OrderSummary({ order }) {
  return (
    <dl className="order-summary">
      <div>
        <dt>상품금액</dt>
        <dd>{order.subtotal.toLocaleString()}원</dd>
      </div>
      <div>
        <dt>배송비</dt>
        <dd>{order.shipping === 0 ? '무료' : `${order.shipping.toLocaleString()}원`}</dd>
      </div>
      <div className="order-summary__total">
        <dt>총 결제금액</dt>
        <dd>{order.total.toLocaleString()}원</dd>
      </div>
    </dl>
  )
}

export default OrderSummary
