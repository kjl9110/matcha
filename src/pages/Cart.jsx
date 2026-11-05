import { Link, useNavigate } from 'react-router-dom'
import { IoRemove, IoAdd, IoTrashOutline } from 'react-icons/io5'
import data from '../data/daehandawon_products.json'
import { useCart } from '../context/useCart.js'
import { calcOrder, FREE_SHIPPING_MIN, MAX_QUANTITY } from '../utils/order.js'
import OrderSummary from '../components/OrderSummary.jsx'
import './Order.css'

function Cart() {
  const navigate = useNavigate()
  const { items, updateQuantity, removeItem } = useCart()
  const order = calcOrder(items, data.products)

  if (order.lines.length === 0) {
    return (
      <section className="order-page order-empty">
        <h2 className="order-page__title">장바구니</h2>
        <p>장바구니가 비어 있습니다.</p>
        <Link to="/" className="order-button">쇼핑 계속하기</Link>
      </section>
    )
  }

  const remain = FREE_SHIPPING_MIN - order.subtotal

  return (
    <section className="order-page">
      <h2 className="order-page__title">장바구니</h2>
      <ul className="order-lines">
        {order.lines.map(({ product, quantity, total }) => (
          <li key={product.id} className="order-line">
            <Link to={`/product/${product.id}`}>
              <img src={`/${product.image}`} alt={product.alt} />
            </Link>
            <div className="order-line__info">
              <Link to={`/product/${product.id}`} className="order-line__title">{product.title}</Link>
              <p className="order-line__price">{total.toLocaleString()}원</p>
              <div className="order-stepper">
                <button
                  type="button"
                  aria-label={`${product.title} 수량 빼기`}
                  disabled={quantity <= 1}
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                >
                  <IoRemove />
                </button>
                <output>{quantity}</output>
                <button
                  type="button"
                  aria-label={`${product.title} 수량 더하기`}
                  disabled={quantity >= MAX_QUANTITY}
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                >
                  <IoAdd />
                </button>
              </div>
            </div>
            <button
              type="button"
              className="order-line__remove"
              aria-label={`${product.title} 삭제`}
              onClick={() => removeItem(product.id)}
            >
              <IoTrashOutline />
            </button>
          </li>
        ))}
      </ul>

      {order.shipping > 0 && (
        <p className="order-notice">{remain.toLocaleString()}원 더 담으면 배송비 무료!</p>
      )}

      <OrderSummary order={order} />

      <button type="button" className="order-button" onClick={() => navigate('/checkout')}>
        {order.total.toLocaleString()}원 주문하기
      </button>
    </section>
  )
}

export default Cart
