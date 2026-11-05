// Vercel 서버 함수: 토스페이먼츠 결제 승인
// 시크릿 키는 환경변수 TOSS_SECRET_KEY 에서만 읽음 (코드·GitHub에 넣지 않음)
import { createRequire } from 'node:module'
import { calcOrder, isValidItems } from '../src/utils/order.js'

const require = createRequire(import.meta.url)
const data = require('../src/data/daehandawon_products.json')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'POST 요청만 받습니다.' })
  }

  const secretKey = process.env.TOSS_SECRET_KEY
  if (!secretKey) {
    return res.status(500).json({ message: '서버에 TOSS_SECRET_KEY가 설정되지 않았습니다.' })
  }

  const { paymentKey, orderId, amount, items } = req.body ?? {}
  if (typeof paymentKey !== 'string' || typeof orderId !== 'string' || !isValidItems(items)) {
    return res.status(400).json({ message: '결제 정보가 올바르지 않습니다.' })
  }

  // 화면에서 넘어온 금액을 믿지 않고 상품 데이터로 다시 계산
  const { lines, total } = calcOrder(items, data.products)
  if (lines.length !== items.length || total !== Number(amount)) {
    return res.status(400).json({ message: '결제 금액이 주문 금액과 다릅니다.' })
  }

  const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${secretKey}:`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paymentKey, orderId, amount: total }),
  })
  const result = await response.json()

  if (!response.ok) {
    return res.status(response.status).json({ code: result.code, message: result.message })
  }

  return res.status(200).json({
    orderId: result.orderId,
    orderName: result.orderName,
    totalAmount: result.totalAmount,
    method: result.method,
    approvedAt: result.approvedAt,
  })
}
