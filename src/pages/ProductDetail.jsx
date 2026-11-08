import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IoChevronBack, IoRemove, IoAdd, IoStar, IoHeart, IoHeartOutline } from 'react-icons/io5'
import data from '../data/daehandawon_products.json'
import details from '../data/product_details.json'
import SectionTitle from '../components/SectionTitle.jsx'
import ProductCard from '../components/ProductCard.jsx'
import StarRating from '../components/StarRating.jsx'
import { useCart } from '../context/useCart.js'
import { useWishlist } from '../context/useWishlist.js'
import { MAX_QUANTITY } from '../utils/order.js'
import { addRecent } from '../utils/localStore.js'
import './ProductDetail.css'

// JSON에서 아직 정해지지 않은 값
const UNKNOWN = '확인 필요'

const SECTIONS = [
  { id: 'detail-info', label: '상세정보' },
  { id: 'detail-reviews', label: '리뷰' },
  { id: 'detail-delivery', label: '배송·교환' },
]

const RETURN_NOTES = [
  '교환·반품은 상품을 받은 날부터 7일 이내에 신청해 주세요.',
  '개봉하여 가치가 줄어든 식품, 비누, 입욕제는 단순 변심으로 인한 반품이 어려워요.',
  '상품이 파손되었거나 잘못 배송된 경우 배송비는 판매자가 부담해요.',
]

function scrollToSection(id) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id).scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
}

function ProductDetail() {
  const { id } = useParams()
  const product = data.products.find((item) => item.id === id)

  if (!product) {
    return (
      <section className="detail-empty">
        <p>상품을 찾을 수 없습니다.</p>
        <Link to="/">메인으로 가기</Link>
      </section>
    )
  }

  // 상품이 바뀌면 수량을 1로 되돌리기 위해 key로 새로 그림
  return <DetailContent key={product.id} product={product} />
}

function DetailContent({ product }) {
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { isWished, toggleWish } = useWishlist()
  const wished = isWished(product.id)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  // 최근 본 상품에 기록
  useEffect(() => {
    addRecent(product.id)
  }, [product.id])

  const addToCart = () => {
    addItem(product.id, quantity)
    setAdded(true)
  }

  // 구매하기: 장바구니를 거치지 않고 이 상품만 바로 주문
  const buyNow = () => {
    navigate('/checkout', { state: { items: [{ id: product.id, quantity }] } })
  }

  const {
    image, alt, title, category, badge, description, discountRate, originalPrice, salePrice,
    rating, reviewCount, volume, origin, shippingMethod, shippingRegion, shippingFee,
    hashtags, reviews,
  } = product

  const detail = details[product.id]
  const feeText = shippingFee === 0 ? '무료배송' : `배송비 ${shippingFee.toLocaleString()}원`

  const specRows = [
    { label: '용량', value: volume },
    { label: '원산지', value: origin },
  ].filter((row) => row.value !== UNKNOWN)

  const infoRows = [
    ...specRows,
    { label: '배송', value: `${shippingMethod} · ${shippingRegion} · ${feeText}` },
  ]

  const related = data.products
    .filter((item) => item.category === category && item.id !== product.id)
    .slice(0, 4)

  return (
    <article className="detail">
      <div className="detail__nav">
        <button type="button" onClick={() => navigate(-1)} aria-label="뒤로 가기">
          <IoChevronBack />
        </button>
        <span>{category}</span>
      </div>

      <img className="detail__image" src={`/${image}`} alt={alt} />

      <div className="detail__body">
        <span className="detail__badge">{badge}</span>
        <h2 className="detail__title">{title}</h2>
        <p className="detail__desc">{description}</p>

        <p className="detail__price">
          <span className="detail__discount">{discountRate}%</span>
          <strong>{salePrice.toLocaleString()}원</strong>
          <del>{originalPrice.toLocaleString()}원</del>
        </p>

        <p className="detail__rating">
          <IoStar aria-hidden="true" />
          <strong>{rating}</strong>
          <span>리뷰 {reviewCount.toLocaleString()}</span>
        </p>

        <dl className="detail__info">
          {infoRows.map(({ label, value }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <p className="detail__tags">{hashtags.join(' ')}</p>

        <div className="detail__order">
          <div className="detail__quantity">
            <span>수량</span>
            <div className="detail__stepper">
              <button
                type="button"
                aria-label="수량 빼기"
                disabled={quantity <= 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                <IoRemove />
              </button>
              <output aria-live="polite">{quantity}</output>
              <button
                type="button"
                aria-label="수량 더하기"
                disabled={quantity >= MAX_QUANTITY}
                onClick={() => setQuantity(quantity + 1)}
              >
                <IoAdd />
              </button>
            </div>
          </div>
          <p className="detail__total">
            <span>총 상품금액</span>
            <strong>{(salePrice * quantity).toLocaleString()}원</strong>
          </p>
          <div className="detail__buttons">
            <button
              type="button"
              className={`detail__wish ${wished ? 'is-wished' : ''}`}
              aria-label={`${title} 찜하기`}
              aria-pressed={wished}
              onClick={() => toggleWish(product.id)}
            >
              {wished ? <IoHeart /> : <IoHeartOutline />}
            </button>
            <button type="button" className="detail__cart" onClick={addToCart}>장바구니</button>
            <button type="button" className="detail__buy" onClick={buyNow}>구매하기</button>
          </div>
          {added && (
            <p className="detail__added" role="status">
              장바구니에 담았습니다. <Link to="/cart">장바구니 보기</Link>
            </p>
          )}
        </div>
      </div>

      <nav className="detail__tabs" aria-label="상품 정보 메뉴">
        {SECTIONS.map(({ id: sectionId, label }) => (
          <button key={sectionId} type="button" onClick={() => scrollToSection(sectionId)}>
            {label}
          </button>
        ))}
      </nav>

      <section id="detail-info" className="detail__story">
        <h3 className="detail__headline">{detail.headline}</h3>
        <p className="detail__lead">{detail.story}</p>

        <ol className="detail__points">
          {detail.points.map(({ title: pointTitle, text }) => (
            <li key={pointTitle}>
              <strong>{pointTitle}</strong>
              <p>{text}</p>
            </li>
          ))}
        </ol>

        <div className="detail__guide">
          <h4>{detail.guideTitle}</h4>
          <ol>
            {detail.guide.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </div>

        <div className="detail__notes">
          <h4>상품 정보</h4>
          <dl className="detail__spec">
            <div>
              <dt>상품명</dt>
              <dd>{title}</dd>
            </div>
            {specRows.map(({ label, value }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <h4>보관 및 사용 안내</h4>
          <ul>
            {detail.care.map((note) => <li key={note}>{note}</li>)}
          </ul>
        </div>
      </section>

      <section id="detail-reviews" className="detail__section section--divided">
        <SectionTitle title={`상품 리뷰 (${reviews.length})`} align="left" />
        <ul className="detail__reviews">
          {reviews.map((review) => (
            <li key={`${review.author}-${review.date}`}>
              <div className="detail__review-meta">
                <span>{review.author}</span>
                <StarRating rating={review.rating} />
                <time dateTime={review.date}>{review.date}</time>
              </div>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="detail-delivery" className="detail__section section--divided">
        <SectionTitle title="배송·교환 안내" align="left" />
        <div className="detail__notes detail__notes--plain">
          <h4>배송</h4>
          <ul>
            <li>{shippingMethod}으로 보내 드리며, {shippingRegion}만 가능해요.</li>
            <li>이 상품은 {feeText} 상품이에요.</li>
          </ul>
          <h4>교환·반품</h4>
          <ul>
            {RETURN_NOTES.map((note) => <li key={note}>{note}</li>)}
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section className="detail__section section--divided">
          <SectionTitle title="같은 카테고리 상품" align="left" />
          <ul className="detail__related">
            {related.map((item) => (
              <li key={item.id}>
                <ProductCard product={item} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}

export default ProductDetail
