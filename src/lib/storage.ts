// Simple storage utility for user data
const STORAGE_KEY = 'fortune_user'

export interface UserData {
  id: string
  createdAt: string
  history: HistoryItem[]
}

export interface HistoryItem {
  id: string
  type: 'tarot' | 'zodiac' | 'name'
  result: string
  timestamp: string
}

export function getUserData(): UserData {
  if (typeof window === 'undefined') return createUser()
  
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return createUser()
  
  try {
    return JSON.parse(data)
  } catch {
    return createUser()
  }
}

export function createUser(): UserData {
  const user: UserData = {
    id: generateId(),
    createdAt: new Date().toISOString(),
    history: []
  }
  saveUser(user)
  return user
}

export function saveUser(user: UserData) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export function addHistory(type: 'tarot' | 'zodiac' | 'name', result: string) {
  const user = getUserData()
  const item: HistoryItem = {
    id: generateId(),
    type,
    result,
    timestamp: new Date().toISOString()
  }
  user.history.unshift(item)
  // Keep only last 50 items
  if (user.history.length > 50) user.history = user.history.slice(0, 50)
  saveUser(user)
  return item
}

export function getHistory(type?: 'tarot' | 'zodiac' | 'name') {
  const user = getUserData()
  if (!type) return user.history
  return user.history.filter(h => h.type === type)
}

// Daily limit
const DAILY_LIMIT_KEY = 'fortune_daily'

export function getDailyLimit() {
  if (typeof window === 'undefined') return { count: 0, date: '' }
  
  const data = localStorage.getItem(DAILY_LIMIT_KEY)
  const today = new Date().toDateString()
  
  if (!data) return { count: 0, date: today }
  
  try {
    const parsed = JSON.parse(data)
    if (parsed.date !== today) return { count: 0, date: today }
    return parsed
  } catch {
    return { count: 0, date: today }
  }
}

export function incrementDailyLimit() {
  if (typeof window === 'undefined') return
  
  const today = new Date().toDateString()
  const current = getDailyLimit()
  const updated = { count: current.count + 1, date: today }
  localStorage.setItem(DAILY_LIMIT_KEY, JSON.stringify(updated))
  return updated
}

export function canUse(): boolean {
  const limit = getDailyLimit()
  return limit.count < 3
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}