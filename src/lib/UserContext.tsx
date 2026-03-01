'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

const STORAGE_KEY = 'fortune_user'
const DAILY_LIMIT_KEY = 'fortune_daily'

export interface UserData {
  id: string
  createdAt: string
  history: HistoryItem[]
}

export interface HistoryItem {
  id: string
  type: 'tarot' | 'zodiac' | 'name' | 'love'
  result: string
  timestamp: string
}

interface UserContextType {
  user: UserData | null
  dailyCount: number
  canUse: boolean
  addToHistory: (type: 'tarot' | 'zodiac' | 'name' | 'love', result: string) => void
  refresh: () => void
}

const UserContext = createContext<UserContextType>({
  user: null,
  dailyCount: 0,
  canUse: true,
  addToHistory: () => {},
  refresh: () => {}
})

export function useUser() {
  return useContext(UserContext)
}

function getUserData(): UserData {
  if (typeof window === 'undefined') {
    return { id: '', createdAt: '', history: [] }
  }
  
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return createUser()
  
  try {
    return JSON.parse(data)
  } catch {
    return createUser()
  }
}

function createUser(): UserData {
  const user: UserData = {
    id: Math.random().toString(36).substring(2, 15),
    createdAt: new Date().toISOString(),
    history: []
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  }
  return user
}

function saveUser(user: UserData) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

function getDailyLimit() {
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

function incrementDailyLimit() {
  if (typeof window === 'undefined') return
  
  const today = new Date().toDateString()
  const current = getDailyLimit()
  const updated = { count: current.count + 1, date: today }
  localStorage.setItem(DAILY_LIMIT_KEY, JSON.stringify(updated))
  return updated
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)
  const [dailyCount, setDailyCount] = useState(0)
  const [canUseService, setCanUseService] = useState(true)

  const refresh = () => {
    const userData = getUserData()
    const limit = getDailyLimit()
    setUser(userData)
    setDailyCount(limit.count)
    setCanUseService(limit.count < 3)
  }

  useEffect(() => {
    refresh()
  }, [])

  const addToHistory = (type: 'tarot' | 'zodiac' | 'name' | 'love', result: string) => {
    const item: HistoryItem = {
      id: Math.random().toString(36).substring(2, 15),
      type,
      result,
      timestamp: new Date().toISOString()
    }
    
    const userData = getUserData()
    userData.history.unshift(item)
    if (userData.history.length > 50) {
      userData.history = userData.history.slice(0, 50)
    }
    saveUser(userData)
    incrementDailyLimit()
    refresh()
  }

  return (
    <UserContext.Provider value={{ user, dailyCount, canUse: canUseService, addToHistory, refresh }}>
      {children}
    </UserContext.Provider>
  )
}