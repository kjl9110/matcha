import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IoChevronBack, IoRemove, IoAdd, IoStar } from 'react-icons/io5'
import data from '../data/daehandawon_products.json'
import SectionTitle from '../components/SectionTitle.jsx'
import ProductCard from '../components/ProductCard.jsx'
import StarRating from '../components/StarRating.jsx'
import './ProductDetail.css'

// JSON에서 아직 정해지지 않은 값
const UNKNOWN = '확인 필요'

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
  const [quantity, setQuantity] = useState(1)

  const {
    image, alt, title, category, badge, description, discountRate, originalPrice, salePrice,
    rating, reviewCount, volume, origin, shippingMethod, shippingRegion, shippingFee,
    hashtags, reviews,
  } = product

  const infoRows = [
    { label: '용량', value: volume },
    { label: '원산지', value: origin },
    {
      label: '배송',
      value: `${shippingMethod} · ${shippingRegion} · ${
        shippingFee === 0 ? '무료배송' : `배송비 ${shippingFee.toLocaleString()}원`
      }`,
    },
  ].filter((row) => row.value !== UNKNOWN)

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
              <button type="button" aria-label="수량 더하기" onClick={() => setQuantity(quantity + 1)}>
                <IoAdd />
              </button>
            </div>
          </div>
          <p className="detail__total">
            <span>총 상품금액</span>
            <strong>{(salePrice * quantity).toLocaleString()}원</strong>
          </p>
          <div className="detail__buttons">
            <button type="button" className="detail__cart">장바구니</button>
            <button type="button" className="detail__buy">구매하기</button>
          </div>
        </div>
      </div>

      <section className="detail__section section--divided">
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
