import { Link } from 'react-router-dom'
import { events } from '../data/events.js'
import SectionTitle from './SectionTitle.jsx'
import './EventSection.css'

// 첫 번째 이벤트는 쿠폰 배너(CouponBanner)로 따로 노출
const listed = events.filter((event) => event.id !== 'free-shipping')

function EventSection() {
  return (
    <section className="event-section section--divided">
      <SectionTitle title="이벤트" align="left" moreLabel="이벤트 더보기" moreTo="/events" />
      <div className="event-section__list">
        {listed.map(({ id, image, alt }) => (
          <Link key={id} to={`/events/${id}`}>
            <img src={image} alt={alt} />
          </Link>
        ))}
      </div>
    </section>
  )
}

export default EventSection
