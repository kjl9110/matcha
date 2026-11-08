import { Link } from 'react-router-dom'
import data from '../data/daehandawon_products.json'
import StarRating from '../components/StarRating.jsx'
import './Order.css'
import './Pages.css'

const reviews = data.products
  .flatMap((product) => product.reviews.map((review) => ({ product, review })))
  .sort((a, b) => b.review.date.localeCompare(a.review.date))

function Reviews() {
  return (
    <section className="order-page">
      <h2 className="order-page__title">상품리뷰 ({reviews.length})</h2>
      <ul className="page-list">
        {reviews.map(({ product, review }) => (
          <li key={`${product.id}-${review.author}-${review.date}`} className="page-review">
            <Link to={`/product/${product.id}`}>
              <img src={`/${product.image}`} alt="" loading="lazy" />
            </Link>
            <div>
              <Link to={`/product/${product.id}`} className="page-review__title">{product.title}</Link>
              <div className="page-review__meta">
                <span>{review.author}</span>
                <StarRating rating={review.rating} />
                <time dateTime={review.date}>{review.date}</time>
              </div>
              <p>{review.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Reviews
