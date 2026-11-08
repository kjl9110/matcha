import { useEffect, useState } from 'react'
import { readList, writeList } from '../utils/localStore.js'
import { AuthContext } from './authContext.js'

const USERS_KEY = 'matcha-users'
const SESSION_KEY = 'matcha-session'

function loadSession() {
  try {
    return localStorage.getItem(SESSION_KEY)
  } catch {
    return null
  }
}

// 시안용 회원 기능: 서버 없이 이 브라우저에만 저장 (실제 서비스의 보안 수준이 아님)
async function hashPassword(userId, password) {
  if (!crypto.subtle) throw new Error('https 또는 localhost 주소에서만 사용할 수 있어요.')
  const bytes = new TextEncoder().encode(`${userId}:${password}`)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => readList(USERS_KEY))
  const [sessionId, setSessionId] = useState(loadSession)

  useEffect(() => {
    writeList(USERS_KEY, users)
  }, [users])

  useEffect(() => {
    try {
      if (sessionId) localStorage.setItem(SESSION_KEY, sessionId)
      else localStorage.removeItem(SESSION_KEY)
    } catch {
      // 저장이 막힌 환경에서는 화면 상태만 유지
    }
  }, [sessionId])

  const user = users.find((item) => item.userId === sessionId) ?? null

  const signup = async ({ userId, name, email, password }) => {
    if (users.some((item) => item.userId === userId)) {
      throw new Error('이미 사용 중인 아이디예요.')
    }
    const passwordHash = await hashPassword(userId, password)
    setUsers([...users, { userId, name, email, passwordHash, joinedAt: new Date().toISOString() }])
    setSessionId(userId)
  }

  const login = async (userId, password) => {
    const found = users.find((item) => item.userId === userId)
    const passwordHash = await hashPassword(userId, password)
    if (!found || found.passwordHash !== passwordHash) {
      throw new Error('아이디 또는 비밀번호가 맞지 않아요.')
    }
    setSessionId(userId)
  }

  const logout = () => setSessionId(null)

  const findId = (name, email) =>
    users.find((item) => item.name === name && item.email === email)?.userId ?? null

  const resetPassword = async (userId, email, password) => {
    const found = users.find((item) => item.userId === userId && item.email === email)
    if (!found) throw new Error('입력한 정보와 일치하는 회원이 없어요.')
    const passwordHash = await hashPassword(userId, password)
    setUsers(users.map((item) => (item === found ? { ...item, passwordHash } : item)))
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, findId, resetPassword }}>
      {children}
    </AuthContext.Provider>
  )
}
