// 서버가 없는 기능의 저장소: 이 브라우저의 localStorage에만 보관
export const RECENT_KEY = 'matcha-recent'
export const ORDERS_KEY = 'matcha-orders'
export const INQUIRIES_KEY = 'matcha-inquiries'
const MAX_RECENT = 20

export function readList(key) {
  try {
    const saved = JSON.parse(localStorage.getItem(key))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

export function writeList(key, list) {
  try {
    localStorage.setItem(key, JSON.stringify(list))
  } catch {
    // 저장이 막힌 환경(시크릿 모드 등)에서는 저장하지 않음
  }
}

export function prependItem(key, item) {
  const next = [item, ...readList(key)]
  writeList(key, next)
  return next
}

export function addRecent(id) {
  const rest = readList(RECENT_KEY).filter((savedId) => savedId !== id)
  writeList(RECENT_KEY, [id, ...rest].slice(0, MAX_RECENT))
}
