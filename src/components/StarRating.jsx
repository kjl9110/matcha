import { IoStar } from 'react-icons/io5'
import './StarRating.css'

function StarRating({ rating }) {
  return (
    <span className="star-rating" role="img" aria-label={`별점 5점 만점에 ${rating}점`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <IoStar key={n} className={n <= rating ? 'is-on' : ''} />
      ))}
    </span>
  )
}

export default StarRating
