import { Link } from 'react-router-dom'
import './Story.css'

// 찻잎을 따는 시기와 차 종류에 대한 일반적인 설명 (회사 이력은 넣지 않음)
const TEAS = [
  { name: '우전', season: '곡우 전', text: '곡우(4월 20일 무렵) 전에 딴 어린 찻잎으로 만들어요. 양이 적고 맛이 부드러워요.' },
  { name: '세작', season: '곡우 ~ 입하', text: '잎이 조금 더 자란 때에 따요. 산뜻한 향과 맛이 고르게 어우러져요.' },
  { name: '중작', season: '입하 이후', text: '잎이 충분히 자란 뒤에 따요. 맛이 한층 진해져 일상에서 즐기기 좋아요.' },
  { name: '대작', season: '늦은 시기', text: '크게 자란 찻잎으로 만들어요. 구수하고 묵직한 맛이 특징이에요.' },
]

const STEPS = [
  { title: '따기', text: '시기에 맞춰 찻잎을 따요. 언제 따느냐에 따라 맛이 달라져요.' },
  { title: '덖기', text: '찻잎을 뜨거운 솥에서 덖어 초록빛과 향을 지켜요.' },
  { title: '비비기', text: '찻잎을 비벼 모양을 잡고, 우릴 때 맛이 잘 우러나게 해요.' },
  { title: '말리기', text: '충분히 말려 오래 두고 마실 수 있게 해요.' },
]

function Story() {
  return (
    <article className="story">
      <header className="story__hero">
        <p className="story__eyebrow">브랜드 이야기</p>
        <h2 className="story__title">한 잔의 초록이{'\n'}찻잔에 닿기까지</h2>
      </header>

      <section className="story__section">
        <p className="story__lead">
          전라남도 보성은 녹차 산지로 널리 알려진 곳이에요.
          언덕을 따라 이어진 차밭의 찻잎이 어떤 과정을 거쳐 한 잔의 차가 되는지 소개합니다.
        </p>
      </section>

      <div className="story__photo" role="img" aria-label="아침 햇살이 비치는 차밭 언덕과 찻잎" />

      <section className="story__section">
        <h3 className="story__heading">언제 따느냐에 따라 달라지는 맛</h3>
        <ul className="story__teas">
          {TEAS.map(({ name, season, text }) => (
            <li key={name}>
              <div>
                <strong>{name}</strong>
                <span>{season}</span>
              </div>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="story__section story__section--dark">
        <h3 className="story__heading">찻잎이 녹차가 되는 과정</h3>
        <ol className="story__steps">
          {STEPS.map(({ title, text }) => (
            <li key={title}>
              <strong>{title}</strong>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="story__section story__cta">
        <h3 className="story__heading">나에게 맞는 차를 찾아보세요</h3>
        <Link to="/products" className="story__button">전체상품 보기</Link>
      </section>
    </article>
  )
}

export default Story
