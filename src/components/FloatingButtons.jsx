import { IoChatbubblesOutline, IoArrowUp } from 'react-icons/io5'
import { RiKakaoTalkFill } from 'react-icons/ri'
import './FloatingButtons.css'

function FloatingButtons() {
  return (
    <div className="floating-buttons">
      <a href="#" className="floating-buttons__item">
        <IoChatbubblesOutline className="floating-buttons__icon" />
        <span>문의하기</span>
      </a>
      <a href="#" className="floating-buttons__item">
        <span className="floating-buttons__icon floating-buttons__naver" aria-hidden="true">N</span>
        <span>톡톡상담</span>
      </a>
      <a href="#" className="floating-buttons__item">
        <RiKakaoTalkFill className="floating-buttons__icon" />
        <span>카톡상담</span>
      </a>
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
