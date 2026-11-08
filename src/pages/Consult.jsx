import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import NotFound from './NotFound.jsx'
import './Pages.css'

// 실제 톡톡·카카오톡 채널을 만들기 전까지 쓰는 시안용 자동 상담 창
const CHANNELS = {
  talk: { name: '톡톡상담', service: '네이버 톡톡', className: 'consult--talk' },
  kakao: { name: '카톡상담', service: '카카오톡', className: 'consult--kakao' },
}

const FAQ = [
  { question: '배송비가 얼마예요?', answer: '배송비는 3,000원이에요. 상품금액이 5만 원 이상이거나 무료배송 상품만 주문하면 무료예요.' },
  { question: '교환·반품은 어떻게 해요?', answer: '상품을 받은 날부터 7일 이내에 문의하기로 신청해 주세요. 개봉한 식품, 비누, 입욕제는 단순 변심으로 반품하기 어려워요.' },
  { question: '상담 시간이 궁금해요', answer: '평일 오전 10시부터 오후 6시까지 상담해요. 점심시간은 낮 12시부터 1시까지이고, 토요일, 일요일, 공휴일은 쉬어요.' },
  { question: '주문은 어떻게 해요?', answer: '상품을 장바구니에 담거나 상세페이지에서 바로 구매한 뒤, 주문서를 작성하고 결제하면 완료돼요.' },
]

function Consult() {
  const { channel: channelId } = useParams()
  const channel = CHANNELS[channelId]
  const [messages, setMessages] = useState([])

  // 톡톡과 카톡 사이를 오갈 때 대화를 새로 시작
  const [activeId, setActiveId] = useState(channelId)
  if (activeId !== channelId) {
    setActiveId(channelId)
    setMessages([])
  }

  if (!channel) return <NotFound />

  const ask = ({ question, answer }) => {
    setMessages([...messages, { from: 'me', text: question }, { from: 'shop', text: answer }])
  }

  return (
    <section className={`consult ${channel.className}`}>
      <header className="consult__header">
        <h2>{channel.name}</h2>
        <p>대한다원 자동 상담</p>
      </header>

      <div className="consult__chat" aria-live="polite">
        <p className="consult__bubble">안녕하세요, 대한다원입니다. 궁금한 내용을 골라 주세요.</p>
        {messages.map(({ from, text }, index) => (
          <p
            key={`${index}-${text}`}
            className={`consult__bubble ${from === 'me' ? 'consult__bubble--me' : ''}`}
          >
            {text}
          </p>
        ))}
      </div>

      <div className="consult__questions">
        {FAQ.map((item) => (
          <button key={item.question} type="button" onClick={() => ask(item)}>
            {item.question}
          </button>
        ))}
      </div>

      <p className="consult__notice">
        시안용 자동 상담이에요. 실제 {channel.service} 채널과는 아직 연결되어 있지 않아요.
        다른 내용은 <Link to="/contact">문의하기</Link>로 남겨 주세요.
      </p>
    </section>
  )
}

export default Consult
