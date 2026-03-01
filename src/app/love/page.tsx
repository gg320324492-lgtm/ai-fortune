'use client'
import { useState } from 'react'
import { useUser } from '@/lib/UserContext'

const zodiacSigns = [
  { name: '白羊座', emoji: '♈', element: '火' },
  { name: '金牛座', emoji: '♉', element: '土' },
  { name: '双子座', emoji: '♊', element: '风' },
  { name: '巨蟹座', emoji: '♋', element: '水' },
  { name: '狮子座', emoji: '♌', element: '火' },
  { name: '处女座', emoji: '♍', element: '土' },
  { name: '天秤座', emoji: '♎', element: '风' },
  { name: '天蝎座', emoji: '♏', element: '水' },
  { name: '射手座', emoji: '♐', element: '火' },
  { name: '摩羯座', emoji: '♑', element: '土' },
  { name: '水瓶座', emoji: '♒', element: '风' },
  { name: '双鱼座', emoji: '♓', element: '水' }
]

const loveStyles: Record<string, { style: string; ideal: string; weakness: string }> = {
  '白羊座': { style: '直接热烈，追求刺激', ideal: '勇敢主动型的伴侣', weakness: '缺乏耐心，易冲动' },
  '金牛座': { style: '忠诚稳定，注重物质', ideal: '稳重可靠的伴侣', weakness: '固执，占有欲强' },
  '双子座': { style: '多变好奇，喜欢新鲜感', ideal: '有趣幽默的伴侣', weakness: '情感不稳定' },
  '巨蟹座': { style: '温柔顾家，敏感细腻', ideal: '安全感强的伴侣', weakness: '过度依赖，情绪化' },
  '狮子座': { style: '自信大方，掌控欲强', ideal: '崇拜自己的伴侣', weakness: '自尊心过强' },
  '处女座': { style: '追求完美，挑剔细致', ideal: '干净整洁的伴侣', weakness: '过于苛刻' },
  '天秤座': { style: '追求和谐，外表出众', ideal: '颜值高的伴侣', weakness: '选择困难' },
  '天蝎座': { style: '深情执着，占有欲强', ideal: '专一忠诚的伴侣', weakness: '记仇报复' },
  '射手座': { style: '热爱自由，乐观开朗', ideal: '支持自己旅行的伴侣', weakness: '不负责任' },
  '摩羯座': { style: '务实上进，稳重内敛', ideal: '事业心强的伴侣', weakness: '过于严肃' },
  '水瓶座': { style: '独立创新，思维独特', ideal: '尊重个人空间的伴侣', weakness: '情感冷漠' },
  '双鱼座': { style: '浪漫多情，梦幻温柔', ideal: '浪漫体贴的伴侣', weakness: '逃避现实' }
}

export default function Love() {
  const { canUse, dailyCount, addToHistory } = useUser()
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [sign1, setSign1] = useState('')
  const [sign2, setSign2] = useState('')
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const analyze = async () => {
    if (!canUse) return
    if (!name1.trim() || !name2.trim() || !sign1 || !sign2) return
    
    setIsLoading(true)
    try {
      const res = await fetch('/api/fortune', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: 'love', 
          name1: name1, 
          name2: name2,
          sign1: sign1,
          sign2: sign2
        })
      })
      const data = await res.json()
      const reading = data.content || '暂无解读'
      setResult(reading)
      addToHistory('love', name1 + ' & ' + name2 + ' - ' + reading)
    } catch (e) {
      setResult('抱歉，分析暂时不可用。')
    }
    setIsLoading(false)
  }

  return (
    <div className='max-w-2xl mx-auto relative'>
      {!canUse && (
        <div className='glass p-4 mb-6 bg-red-900/20 border-red-500/30'>
          <p className='text-center text-sm text-red-400'>今日免费次数已用完 ({dailyCount}/3)</p>
        </div>
      )}

      {/* Floating decorations */}
      <div className='fixed inset-0 pointer-events-none overflow-hidden'>
        <span className='absolute top-20 left-10 text-4xl opacity-20 animate-float' style={{animationDelay: '0s'}}>💕</span>
        <span className='absolute top-40 right-20 text-3xl opacity-20 animate-float' style={{animationDelay: '1s'}}>❤️</span>
        <span className='absolute bottom-40 left-20 text-3xl opacity-20 animate-float' style={{animationDelay: '2s'}}>💘</span>
        <span className='absolute bottom-20 right-10 text-4xl opacity-20 animate-float' style={{animationDelay: '0.5s'}}>🥰</span>
      </div>

      <div className='text-center mb-10 relative'>
        <div className='text-6xl mb-4 animate-bounce-in'>💕</div>
        <h1 className='text-2xl font-bold mb-2 gradient-text-colorful'>爱情配对分析</h1>
        <p className='text-sm text-[var(--text-secondary)]'>输入两人的信息，探索你们的缘分</p>
        <p className='text-xs text-[var(--text-tertiary)] mt-1'>今日已使用 {dailyCount}/3 次</p>
      </div>

      {/* Input form */}
      <div className='glass p-6 mb-6'>
        <div className='grid md:grid-cols-2 gap-4 mb-4'>
          <div>
            <label className='block text-sm text-[var(--text-secondary)] mb-2'>你的名字</label>
            <input 
              type='text' 
              value={name1} 
              onChange={(e) => setName1(e.target.value)}
              placeholder='请输入你的名字' 
              className='w-full px-4 py-3 text-sm'
              disabled={!canUse}
            />
          </div>
          <div>
            <label className='block text-sm text-[var(--text-secondary)] mb-2'>TA的名字</label>
            <input 
              type='text' 
              value={name2} 
              onChange={(e) => setName2(e.target.value)}
              placeholder='请输入TA的名字' 
              className='w-full px-4 py-3 text-sm'
              disabled={!canUse}
            />
          </div>
        </div>

        <div className='grid md:grid-cols-2 gap-4 mb-6'>
          <div>
            <label className='block text-sm text-[var(--text-secondary)] mb-2'>你的星座</label>
            <select 
              value={sign1} 
              onChange={(e) => setSign1(e.target.value)}
              className='w-full px-4 py-3 text-sm bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg'
              disabled={!canUse}
            >
              <option value=''>选择星座</option>
              {zodiacSigns.map((s) => (
                <option key={s.name} value={s.name}>{s.emoji} {s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className='block text-sm text-[var(--text-secondary)] mb-2'>TA的星座</label>
            <select 
              value={sign2} 
              onChange={(e) => setSign2(e.target.value)}
              className='w-full px-4 py-3 text-sm bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg'
              disabled={!canUse}
            >
              <option value=''>选择星座</option>
              {zodiacSigns.map((s) => (
                <option key={s.name} value={s.name}>{s.emoji} {s.name}</option>
              ))}
            </select>
          </div>
        </div>

        <button 
          onClick={analyze}
          disabled={!canUse || !name1.trim() || !name2.trim() || !sign1 || !sign2}
          className='btn-primary w-full py-4 text-base glow-pink disabled:opacity-50'
        >
          💕 开始分析
        </button>
      </div>

      {/* Result */}
      {isLoading && (
        <div className='glass p-8 text-center'>
          <div className='w-12 h-12 mx-auto border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4'></div>
          <p className='text-[var(--text-secondary)]'>AI 正在分析你们的缘分...</p>
        </div>
      )}

      {result && (
        <div className='glass p-6 animate-fade-in gradient-border'>
          <div className='flex items-center justify-center gap-3 mb-4'>
            <span className='text-2xl'>{zodiacSigns.find(s => s.name === sign1)?.emoji}</span>
            <span className='text-2xl'>💕</span>
            <span className='text-2xl'>{zodiacSigns.find(s => s.name === sign2)?.emoji}</span>
          </div>
          
          <h2 className='text-center text-lg font-bold gradient-text-colorful mb-4'>
            {name1} & {name2}
          </h2>

          <div className='bg-gradient-to-br from-[var(--bg-tertiary)] to-pink-900/20 p-5 rounded-xl mb-4 border border-pink-500/20'>
            <div className='flex items-center gap-2 mb-3'>
              <span className='text-xl'>🤖</span>
              <span className='text-sm font-medium text-pink-400'>AI 深度分析</span>
            </div>
            <p className='text-sm leading-relaxed text-[var(--text-secondary)] whitespace-pre-wrap'>{result}</p>
          </div>

          {/* Quick compatibility */}
          {sign1 && sign2 && (
            <div className='grid grid-cols-2 gap-3 mb-4'>
              <div className='glass p-3 rounded-lg text-center'>
                <div className='text-xs text-[var(--text-tertiary)] mb-1'>你的恋爱风格</div>
                <div className='text-sm'>{loveStyles[sign1]?.style}</div>
              </div>
              <div className='glass p-3 rounded-lg text-center'>
                <div className='text-xs text-[var(--text-tertiary)] mb-1'>TA的恋爱风格</div>
                <div className='text-sm'>{loveStyles[sign2]?.style}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tips */}
      {!result && !isLoading && (
        <div className='glass p-5'>
          <p className='text-center text-xs text-[var(--text-tertiary)] mb-3'>💡 提示</p>
          <div className='text-xs text-[var(--text-secondary)] space-y-2'>
            <p>• 星座配对仅供参考，缘分天注定，努力在个人</p>
            <p>• 真正的爱情需要双方共同经营</p>
            <p>• 娱乐而已，切勿过于当真</p>
          </div>
        </div>
      )}

      <p className='mt-8 text-center text-xs text-[var(--text-tertiary)]'>娱乐仅供参考</p>
    </div>
  )
}