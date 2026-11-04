import SectionTitle from './SectionTitle.jsx'
import './EventSection.css'

const events = [
  { image: '/images/event 02.png', alt: '직접 마셔보고 전하는 리얼후기, 대한다원의 한 잔 후기로 만나보세요' },
  { image: '/images/event 03.png', alt: '2026년산 입고 처음딴차, 올해의 첫 향을 만나보세요' },
]

function EventSection() {
  return (
    <section className="event-section section--divided">
      <SectionTitle title="이벤트" align="left" moreLabel="이벤트 더보기" />
      <div className="event-section__list">
        {events.map(({ image, alt }) => (
          <a key={image} href="#">
            <img src={image} alt={alt} />
          </a>
        ))}
      </div>
    </section>
  )
}

export default EventSection
