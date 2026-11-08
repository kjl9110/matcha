import { Link, useParams } from 'react-router-dom'
import { events } from '../data/events.js'
import './Order.css'
import './Pages.css'

export function EventList() {
  return (
    <section className="order-page">
      <h2 className="order-page__title">이벤트</h2>
      <ul className="page-list">
        {events.map(({ id, image, alt, title }) => (
          <li key={id} className="page-event">
            <Link to={`/events/${id}`}>
              <img src={image} alt={alt} />
              <strong>{title}</strong>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function EventDetail() {
  const { id } = useParams()
  const event = events.find((item) => item.id === id)

  if (!event) {
    return (
      <section className="order-page order-empty">
        <p>이벤트를 찾을 수 없습니다.</p>
        <Link to="/events" className="order-button">이벤트 목록</Link>
      </section>
    )
  }

  return (
    <section className="order-page">
      <h2 className="order-page__title">{event.title}</h2>
      <img className="page-event__image" src={event.image} alt={event.alt} />
      <p className="page-text">{event.text}</p>
      <Link to={event.link.to} className="order-button">{event.link.label}</Link>
      <p className="page-link-row"><Link to="/events">이벤트 목록</Link></p>
    </section>
  )
}
