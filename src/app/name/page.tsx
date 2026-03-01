'use client'
import { useState } from 'react'
import { useUser } from '@/lib/UserContext'

function calculateScore(): { total: number; wuxing: string; meaning: string } {
  const total = Math.min(100, 65 + Math.floor(Math.random() * 30))
  const wuxing = ['木', '火', '土', '金', '水'][Math.floor(Math.random() * 5)]
  const meanings: Record<string, string> = {
    '木': '生机勃发，向上发展，具有创新精神和领导才能',
    '火': '热情洋溢，积极进取，行动力强有活力',
    '土': '稳重厚道，诚信可靠，有耐心和责任感',
    '金': '刚健果断，财运亨通，有正义感和领导力',
    '水': '智慧灵活，财运流动，适应力强善于沟通'
  }
  return { total, wuxing, meaning: meanings[wuxing] }
}

const wuxingColors: Record<string, string> = {
  '木': 'from-green-500 to-emerald-400',
  '火': 'from-red-500 to-orange-400',
  '土': 'from-amber-500 to-yellow-400',
  '金': 'from-gray-300 to-slate-200',
  '水': 'from-cyan-500 to-blue-400'
}

const wuxingBg: Record<string, string> = {
  '木': 'bg-green-500/20 border-green-500/30',
  '火': 'bg-red-500/20 border-red-500/30',
  '土': 'bg-amber-500/20 border-amber-500/30',
  '金': 'bg-gray-500/20 border-gray-500/30',
  '水': 'bg-cyan-500/20 border-cyan-500/30'
}

export default function Name() {
  const { canUse, dailyCount, addToHistory } = useUser()
  const [name, setName] = useState('')
  const [result, setResult] = useState<{ total: number; wuxing: string; meaning: string } | null>(null)
  const [aiReading, setAiReading] = useState('')
  const [isLoadingAI, setIsLoadingAI] = useState(false)

  const analyze = async () => {
    if (!canUse) return
    if (!name.trim()) return
    
    const score = calculateScore()
    setResult(score)
    setAiReading('')
    
    setIsLoadingAI(true)
    try {
      const res = await fetch('/api/fortune', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'name', name: name })
      })
      const data = await res.json()
      const reading = data.content || '暂无解读'
      setAiReading(reading)
      addToHistory('name', name + ' - ' + score.wuxing + '属性 - ' + reading)
    } catch (e) {
      setAiReading('')
    }
    setIsLoadingAI(false)
  }

  const getColor = (score: number) => {
    if (score >= 80) return '#10b981'
    if (score >= 70) return '#60a5fa'
    return '#fbbf24'
  }

  return (
    <div className='max-w-lg mx-auto relative'>
      {!canUse && (
        <div className='glass p-4 mb-6 bg-red-900/20 border-red-500/30'>
          <p className='text-center text-sm text-red-400'>今日免费次数已用完 ({dailyCount}/3)</p>
        </div>
      )}

      <div className='text-center mb-10 relative'>
        <div className='text-6xl mb-4 animate-bounce-in'>✍️</div>
        <h1 className='text-2xl font-bold mb-2 gradient-text-colorful'>姓名分析</h1>
        <p className='text-sm text-[var(--text-secondary)]'>输入你的名字，探索姓名中蕴含的命运密码</p>
        <p className='text-xs text-[var(--text-tertiary)] mt-1'>今日已使用 {dailyCount}/3 次</p>
      </div>

      <div className='flex gap-3 mb-8'>
        <input 
          type='text' 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          placeholder='请输入你的名字' 
          className='flex-1 px-5 py-3 text-sm'
          onKeyDown={(e) => e.key === 'Enter' && analyze()}
          disabled={!canUse}
        />
        <button 
          onClick={analyze} 
          disabled={!canUse || !name.trim()}
          className='btn-primary px-6 py-3 text-sm glow-amber disabled:opacity-50'
        >
          🔍 分析
        </button>
      </div>

      {result && (
        <div className='glass p-6 animate-fade-in gradient-border'>
          <div className='flex items-center justify-between mb-5'>
            <h2 className='text-lg font-semibold text-white'>{name}</h2>
            <div className={'px-4 py-2 rounded-full bg-gradient-to-r ' + wuxingColors[result.wuxing] + ' text-sm font-bold'}>
              {result.wuxing}属性
            </div>
          </div>
          
          <div className='flex justify-center mb-6 relative'>
            <div className={'absolute inset-0 bg-gradient-to-r ' + wuxingColors[result.wuxing] + ' opacity-20 blur-2xl rounded-full'}></div>
            <div className='w-32 h-32 relative'>
              <svg className='w-full h-full transform -rotate-90'>
                <circle cx='64' cy='64' r='56' fill='none' stroke='var(--border)' strokeWidth='8' />
                <circle 
                  cx='64' cy='64' r='56' 
                  fill='none' 
                  stroke={getColor(result.total)} 
                  strokeWidth='8' 
                  strokeLinecap='round' 
                  strokeDasharray={result.total * 3.52 + ' 352'} 
                  className='transition-all duration-1000'
                />
              </svg>
              <div className='absolute inset-0 flex flex-col items-center justify-center'>
                <span className='text-4xl font-bold' style={{ color: getColor(result.total) }}>{result.total}</span>
                <span className='text-xs text-[var(--text-tertiary)]'>分</span>
              </div>
            </div>
          </div>

          {isLoadingAI && (
            <div className='flex items-center justify-center gap-2 py-4 border-t border-[var(--border)]'>
              <div className='w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin'></div>
              <span className='text-sm text-[var(--text-secondary)]'>AI 分析中...</span>
            </div>
          )}

          {aiReading && (
            <div className={'p-4 rounded-xl mb-4 border ' + wuxingBg[result.wuxing]}>
              <div className='flex items-center gap-2 mb-3'>
                <span className='text-lg'>🤖</span>
                <span className='text-sm font-medium'>AI 深度分析</span>
              </div>
              <p className='text-sm leading-relaxed text-[var(--text-secondary)]'>{aiReading}</p>
            </div>
          )}

          <button 
            onClick={() => { setName(''); setResult(null); setAiReading('') }} 
            className='glass w-full py-3 text-sm hover:bg-[var(--surface-hover)] transition rounded-xl'
          >
            🔄 重新分析
          </button>
        </div>
      )}

      {!result && (
        <div className='glass p-5'>
          <p className='text-center text-xs text-[var(--text-tertiary)] mb-4'>五行属性</p>
          <div className='flex justify-center gap-3'>
            {['木', '火', '土', '金', '水'].map((w) => (
              <div key={w} className={'w-12 h-12 rounded-xl bg-gradient-to-br ' + wuxingColors[w] + ' flex items-center justify-center text-lg font-bold'}>{w}</div>
            ))}
          </div>
        </div>
      )}

      <p className='mt-10 text-center text-xs text-[var(--text-tertiary)]'>娱乐仅供参考</p>
    </div>
  )
}