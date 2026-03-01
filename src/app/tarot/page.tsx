'use client'
import { useState } from 'react'
import { useUser } from '@/lib/UserContext'

const tarotCards = [
  { name: '愚人', keywords: '新的开始、自由、冒险', emoji: '🃏' },
  { name: '魔术师', keywords: '创造、意志力、技能', emoji: '🎩' },
  { name: '女祭司', keywords: '直觉、智慧、潜意识', emoji: '📚' },
  { name: '皇后', keywords: '丰盛、母性、创造力', emoji: '👑' },
  { name: '皇帝', keywords: '权威、稳定性、领导力', emoji: '🏛️' },
  { name: '教皇', keywords: '传统、教导、信念', emoji: '⛪' },
  { name: '恋人', keywords: '爱情、选择、和谐', emoji: '💕' },
  { name: '战车', keywords: '胜利、意志、决心', emoji: '⚔️' },
  { name: '力量', keywords: '勇气、内在力量、耐心', emoji: '🦁' },
  { name: '隐士', keywords: '内省、智慧、指引', emoji: '🕯️' },
  { name: '命运之轮', keywords: '变化、转折、机遇', emoji: '🎡' },
  { name: '正义', keywords: '平衡、真相、因果', emoji: '⚖️' },
  { name: '倒吊人', keywords: '暂停、牺牲、等待', emoji: '⏳' },
  { name: '死亡', keywords: '结束、转变、新生', emoji: '🦋' },
  { name: '节制', keywords: '平衡、耐心、中庸', emoji: '🏺' },
  { name: '星星', keywords: '希望、灵感、疗愈', emoji: '⭐' },
  { name: '月亮', keywords: '直觉、幻觉、情绪', emoji: '🌙' },
  { name: '太阳', keywords: '成功、快乐、活力', emoji: '☀️' },
  { name: '世界', keywords: '完成、成就、循环', emoji: '🌍' }
]

export default function Tarot() {
  const { canUse, dailyCount, addToHistory } = useUser()
  const [drawn, setDrawn] = useState<typeof tarotCards[0] | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [aiReading, setAiReading] = useState('')
  const [isLoadingAI, setIsLoadingAI] = useState(false)

  const drawCard = async () => {
    if (!canUse) return
    if (isAnimating) return
    
    setIsAnimating(true)
    setDrawn(null)
    setAiReading('')
    
    setTimeout(async () => {
      const random = tarotCards[Math.floor(Math.random() * tarotCards.length)]
      setDrawn(random)
      setIsAnimating(false)
      
      setIsLoadingAI(true)
      try {
        const res = await fetch('/api/fortune', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'tarot', card: random })
        })
        const data = await res.json()
        const reading = data.content || '暂无解读'
        setAiReading(reading)
        addToHistory('tarot', random.name + ' - ' + reading)
      } catch (e) {
        setAiReading('抱歉，AI解读暂时不可用。')
      }
      setIsLoadingAI(false)
    }, 1500)
  }

  return (
    <div className='max-w-lg mx-auto relative'>
      {/* Daily limit banner */}
      {!canUse && (
        <div className='glass p-4 mb-6 bg-red-900/20 border-red-500/30'>
          <p className='text-center text-sm text-red-400'>
            今日免费次数已用完 ({dailyCount}/3)
          </p>
          <p className='text-center text-xs text-[var(--text-tertiary)] mt-1'>
            明日0点重置，或查看历史记录
          </p>
        </div>
      )}

      {/* Floating decorations */}
      <div className='fixed inset-0 pointer-events-none overflow-hidden'>
        <span className='absolute top-20 left-10 text-4xl opacity-20 animate-float' style={{animationDelay: '0s'}}>🃏</span>
        <span className='absolute top-40 right-20 text-3xl opacity-20 animate-float' style={{animationDelay: '1s'}}>⭐</span>
        <span className='absolute bottom-40 left-20 text-3xl opacity-20 animate-float' style={{animationDelay: '2s'}}>🌙</span>
        <span className='absolute bottom-20 right-10 text-4xl opacity-20 animate-float' style={{animationDelay: '0.5s'}}>🔮</span>
      </div>

      <div className='text-center mb-10 relative'>
        <div className='text-6xl mb-4 animate-bounce-in'>🃏</div>
        <h1 className='text-2xl font-bold mb-2 gradient-text-colorful'>AI 塔罗牌</h1>
        <p className='text-sm text-[var(--text-secondary)]'>静心冥想，抽取一张属于你的牌</p>
        <p className='text-xs text-[var(--text-tertiary)] mt-1'>今日已使用 {dailyCount}/3 次</p>
      </div>

      {!drawn && !isAnimating && (
        <div className='relative'>
          <div className='absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 blur-3xl rounded-full'></div>
          <button 
            onClick={drawCard} 
            disabled={!canUse}
            className={'relative btn-primary w-full py-4 text-base glow-purple disabled:opacity-50 disabled:cursor-not-allowed'}
          >
            <span className='mr-2'>🔮</span>
            抽取塔罗牌
          </button>
        </div>
      )}

      {isAnimating && (
        <div className='py-20 text-center relative'>
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='w-32 h-48 glass rounded-xl animate-pulse flex items-center justify-center text-5xl relative'>
              <span className='absolute animate-spin'>🃏</span>
              <span className='text-5xl'>🃏</span>
            </div>
          </div>
          <div className='relative z-10 mt-8'>
            <div className='w-12 h-12 mx-auto border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin'></div>
            <p className='mt-6 text-[var(--text-secondary)]'>正在洗牌...</p>
          </div>
        </div>
      )}

      {drawn && (
        <div className='glass p-6 animate-fade-in gradient-border'>
          <div className='flex items-start gap-5 mb-5'>
            <div className='w-20 h-28 glass rounded-xl flex items-center justify-center text-4xl glow-purple animate-bounce-in flex-shrink-0'>
              {drawn.emoji}
            </div>
            <div className='flex-1 pt-2'>
              <h2 className='text-xl font-bold gradient-text-colorful mb-1'>{drawn.name}</h2>
              <p className='text-xs text-[var(--text-secondary)]'>{drawn.keywords}</p>
            </div>
          </div>
          
          {isLoadingAI && (
            <div className='flex items-center justify-center gap-2 py-4 border-t border-[var(--border)]'>
              <div className='w-5 h-5 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin'></div>
              <span className='text-sm text-[var(--text-secondary)]'>AI 解读中...</span>
            </div>
          )}
          
          {aiReading && (
            <div className='bg-gradient-to-br from-[var(--bg-tertiary)] to-purple-900/20 p-4 rounded-xl mb-4 border border-purple-500/20'>
              <div className='flex items-center gap-2 mb-3'>
                <span className='text-lg'>🤖</span>
                <span className='text-sm font-medium text-purple-400'>AI 解读</span>
              </div>
              <p className='text-sm leading-relaxed text-[var(--text-secondary)]'>{aiReading}</p>
            </div>
          )}
          
          <button onClick={drawCard} className='glass w-full py-3 text-sm hover:bg-[var(--surface-hover)] transition rounded-xl flex items-center justify-center gap-2' disabled={!canUse}>
            <span>🔄</span> 再抽一次
          </button>
        </div>
      )}

      {!drawn && (
        <div className='mt-12 glass p-5'>
          <p className='text-center text-xs text-[var(--text-tertiary)] mb-4'>19张大阿尔卡纳</p>
          <div className='flex justify-center gap-1 flex-wrap'>
            {['🃏','🎩','📚','👑','🏛️','⛪','💕','⚔️','🦁','🕯️','🎡','⚖️'].map((e, i) => (
              <span key={i} className='text-xl opacity-40 hover:opacity-100 transition-opacity cursor-default'>{e}</span>
            ))}
          </div>
        </div>
      )}

      <p className='mt-10 text-center text-xs text-[var(--text-tertiary)]'>娱乐仅供参考</p>
    </div>
  )
}