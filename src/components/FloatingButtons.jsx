import { Link } from 'react-router-dom'
import { IoChatbubblesOutline, IoArrowUp } from 'react-icons/io5'
import { RiKakaoTalkFill } from 'react-icons/ri'
import './FloatingButtons.css'

// 톡톡·카톡은 상담 채널이 생기기 전까지 시안용 자동 상담 창으로 연결
function FloatingButtons() {
  return (
    <div className="floating-buttons">
      <Link to="/contact" className="floating-buttons__item">
        <IoChatbubblesOutline className="floating-buttons__icon" />
        <span>문의하기</span>
      </Link>
      <Link to="/consult/talk" className="floating-buttons__item">
        <span className="floating-buttons__icon floating-buttons__naver" aria-hidden="true">N</span>
        <span>톡톡상담</span>
      </Link>
      <Link to="/consult/kakao" className="floating-buttons__item">
        <RiKakaoTalkFill className="floating-buttons__icon" />
        <span>카톡상담</span>
      </Link>
      <button
        type="button"
        className="floating-buttons__item"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <IoArrowUp className="floating-buttons__icon" />
        <span>상단으로</span>
      </button>
    </div>
  )
}

export default FloatingButtons
