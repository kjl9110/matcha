import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import 'swiper/css'
import data from '../data/daehandawon_products.json'
import SectionTitle from './SectionTitle.jsx'
import StarRating from './StarRating.jsx'
import './ReviewSection.css'

// 후기가 많은 상품 6개의 첫 번째 후기
const reviews = [...data.products]
  .sort((a, b) => b.reviewCount - a.reviewCount)
  .slice(0, 6)
  .map((product) => ({ product, review: product.reviews[0] }))

function ReviewSection() {
  const [swiper, setSwiper] = useState(null)

  return (
    <section className="review-section section--divided">
      <SectionTitle title="상품리뷰 코너" align="left" moreLabel="상품리뷰 더보기" moreTo="/reviews" />
      <div className="review-section__slider">
        <Swiper slidesPerView={3} spaceBetween={12} onSwiper={setSwiper}>
          {reviews.map(({ product, review }) => (
            <SwiperSlide key={product.id}>
              <article className="review-card">
                <img className="review-card__image" src={`/${product.image}`} alt={product.alt} />
                <div className="review-card__meta">
                  <span>{review.author}</span>
                  <StarRating rating={review.rating} />
                </div>
                <p className="review-card__content">{review.content}</p>
                <Link to={`/product/${product.id}`} className="review-card__product">
                  <img src={`/${product.image}`} alt="" />
                  <span>{product.title}</span>
                </Link>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          type="button"
          className="review-section__arrow review-section__arrow--prev"
          aria-label="이전 리뷰"
          onClick={() => swiper?.slidePrev()}
        >
          <IoChevronBack />
        </button>
        <button
          type="button"
          className="review-section__arrow review-section__arrow--next"
          aria-label="다음 리뷰"
          onClick={() => swiper?.slideNext()}
        >
          <IoChevronForward />
        </button>
      </div>
    </section>
  )
}

export default ReviewSection
