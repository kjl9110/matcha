import { useLocation, useNavigate } from 'react-router-dom'
import { IoChevronBack } from 'react-icons/io5'
import './BackBar.css'

// 메인·결제 결과·간편 로그인 처리(뒤로 가면 결제창·로그인창으로 돌아감)·상세(자체 뒤로가기 있음)에서는 숨김
const HIDDEN = [/^\/$/, /^\/payment\//, /^\/auth\//, /^\/product\//]

function BackBar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  if (HIDDEN.some((pattern) => pattern.test(pathname))) return null

  // 주소로 바로 들어와 이전 화면이 없으면 메인으로
  const goBack = () => {
    if (window.history.state?.idx > 0) navigate(-1)
    else navigate('/')
  }

  return (
    <div className="back-bar">
      <button type="button" onClick={goBack} aria-label="뒤로 가기">
        <IoChevronBack />
      </button>
    </div>
  )
}

export default BackBar
