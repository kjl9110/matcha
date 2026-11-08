import { Link } from 'react-router-dom'
import './StoryBanner.css'

function StoryBanner() {
  return (
    <section className="story-banner">
      <Link to="/story">
        <p className="story-banner__eyebrow">브랜드 이야기</p>
        <h2 className="story-banner__title">한 잔의 초록이{'\n'}찻잔에 닿기까지</h2>
        <span className="story-banner__button">이야기 보기</span>
      </Link>
    </section>
  )
}

export default StoryBanner
