'use client'
import { useState } from 'react'
import { useUser } from '@/lib/UserContext'

const zodiacSigns = [
  { name: '白羊座', emoji: '♈', dates: '3.21-4.19', color: 'from-red-500 to-orange-500' },
  { name: '金牛座', emoji: '♉', dates: '4.20-5.20', color: 'from-green-500 to-emerald-500' },
  { name: '双子座', emoji: '♊', dates: '5.21-6.21', color: 'from-yellow-500 to-amber-500' },
  { name: '巨蟹座', emoji: '♋', dates: '6.22-7.22', color: 'from-cyan-500 to-blue-500' },
  { name: '狮子座', emoji: '♌', dates: '7.23-8.22', color: 'from-orange-500 to-yellow-500' },
  { name: '处女座', emoji: '♍', dates: '8.23-9.22', color: 'from-teal-500 to-green-500' },
  { name: '天秤座', emoji: '♎', dates: '9.23-10.23', color: 'from-pink-500 to-rose-500' },
  { name: '天蝎座', emoji: '♏', dates: '10.24-11.22', color: 'from-purple-500 to-indigo-500' },
  { name: '射手座', emoji: '♐', dates: '11.23-12.21', color: 'from-violet-500 to-purple-500' },
  { name: '摩羯座', emoji: '♑', dates: '12.22-1.19', color: 'from-gray-500 to-slate-500' },
  { name: '水瓶座', emoji: '♒', dates: '1.20-2.18', color: 'from-sky-500 to-blue-500' },
  { name: '双鱼座', emoji: '♓', dates: '2.19-3.20', color: 'from-fuchsia-500 to-pink-500' }
]

const horoscopes: Record<string, { love: string; career: string; luck: string }> = {
  '白羊座': { love: '单身者有机会遇到心动的对象', career: '工作状态佳，适合推进新项目', luck: '幸运颜色红色，幸运数字7' },
  '金牛座': { love: '感情稳定，适合增进了解', career: '财运上升，注意理财', luck: '幸运颜色金色，幸运数字6' },
  '双子座': { love: '社交活动增多，容易结识新朋友', career: '思维活跃，适合创意工作', luck: '幸运颜色黄色，幸运数字5' },
  '巨蟹座': { love: '家庭氛围温暖，适合谈心', career: '注意工作与生活的平衡', luck: '幸运颜色银色，幸运数字2' },
  '狮子座': { love: '魅力四射，吸引异性关注', career: '领导能力突出，获得认可', luck: '幸运颜色橙色，幸运数字1' },
  '处女座': { love: '理性分析感情，避免过度挑剔', career: '适合处理细节工作', luck: '幸运颜色绿色，幸运数字8' },
  '天秤座': { love: '人际关系和谐，适合约会', career: '合作运佳，适合团队协作', luck: '幸运颜色粉色，幸运数字4' },
  '天蝎座': { love: '感情深厚，默契十足', career: '适合深耕专业领域', luck: '幸运颜色黑色，幸运数字9' },
  '射手座': { love: '自由恋爱运，适合出行', career: '适合开拓新市场', luck: '幸运颜色紫色，幸运数字3' },
  '摩羯座': { love: '稳步发展，适合谈婚论嫁', career: '事业心强，收获颇丰', luck: '幸运颜色棕色，幸运数字10' },
  '水瓶座': { love: '独立自主，吸引志同道合的人', career: '创新思维带来突破', luck: '幸运颜色天蓝，幸运数字11' },
  '双鱼座': { love: '浪漫氛围浓厚，适合表白', career: '艺术灵感丰富', luck: '幸运颜色海蓝，幸运数字12' }
}

export default function Zodiac() {
  const { canUse, dailyCount, addToHistory } = useUser()
  const [selected, setSelected] = useState<string | null>(null)
  const [aiReading, setAiReading] = useState('')
  const [isLoadingAI, setIsLoadingAI] = useState(false)

  const getAIReading = async (sign: string) => {
    if (!canUse) return
    
    setIsLoadingAI(true)
    try {
      const res = await fetch('/api/fortune', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'zodiac', zodiac: sign })
      })
      const data = await res.json()
      const reading = data.content || '暂无解读'
      setAiReading(reading)
      addToHistory('zodiac', sign + ' - ' + reading)
    } catch (e) {
      setAiReading('')
    }
    setIsLoadingAI(false)
  }

  const handleSelect = (name: string) => {
    if (!canUse) return
    setSelected(name)
    setAiReading('')
    getAIReading(name)
  }

  const sign = selected ? zodiacSigns.find(z => z.name === selected) : null

  return (
    <div className='max-w-lg mx-auto relative'>
      {!canUse && (
        <div className='glass p-4 mb-6 bg-red-900/20 border-red-500/30'>
          <p className='text-center text-sm text-red-400'>今日免费次数已用完 ({dailyCount}/3)</p>
        </div>
      )}

      <div className='text-center mb-10 relative'>
        <div className='text-6xl mb-4 animate-bounce-in'>⭐</div>
        <h1 className='text-2xl font-bold mb-2 gradient-text-colorful'>星座运势</h1>
        <p className='text-sm text-[var(--text-secondary)]'>选择你的星座，获取今日运势</p>
        <p className='text-xs text-[var(--text-tertiary)] mt-1'>今日已使用 {dailyCount}/3 次</p>
      </div>

      <div className='grid grid-cols-4 gap-2 mb-8 stagger'>
        {zodiacSigns.map((s) => (
          <button 
            key={s.name} 
            onClick={() => handleSelect(s.name)}
            disabled={!canUse}
            className={'glass p-3 text-center card-hover disabled:opacity-50 ' + (selected === s.name ? 'gradient-border' : '')}
          >
            <div className={'w-10 h-10 mx-auto rounded-full bg-gradient-to-br ' + s.color + ' flex items-center justify-center text-xl mb-1'}>{s.emoji}</div>
            <div className='text-xs font-medium'>{s.name}</div>
          </button>
        ))}
      </div>

      {selected && sign && (
        <div className='glass p-6 animate-fade-in'>
          <div className='text-center mb-6'>
            <div className={'w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ' + sign.color + ' flex items-center justify-center text-4xl mb-3 glow-cyan'}>
              {sign.emoji}
            </div>
            <h2 className='text-xl font-bold gradient-text-colorful'>{selected}</h2>
            <p className='text-xs text-[var(--text-tertiary)]'>{sign.dates}</p>
          </div>

          {isLoadingAI && (
            <div className='flex items-center justify-center gap-2 py-4'>
              <div className='w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
              <span className='text-sm text-[var(--text-secondary)]'>AI 解读中...</span>
            </div>
          )}

          {aiReading && (
            <div className='bg-gradient-to-br from-[var(--bg-tertiary)] to-blue-900/20 p-4 rounded-xl mb-4 border border-blue-500/20'>
              <div className='flex items-center gap-2 mb-3'>
                <span className='text-lg'>🤖</span>
                <span className='text-sm font-medium text-blue-400'>AI 今日运势</span>
              </div>
              <p className='text-sm leading-relaxed text-[var(--text-secondary)]'>{aiReading}</p>
            </div>
          )}

          <div className='grid grid-cols-3 gap-3'>
            <div className='glass p-3 rounded-lg text-center'>
              <div className='text-lg mb-1'>💕</div>
              <div className='text-xs text-[var(--text-tertiary)]'>{horoscopes[selected]?.love}</div>
            </div>
            <div className='glass p-3 rounded-lg text-center'>
              <div className='text-lg mb-1'>💼</div>
              <div className='text-xs text-[var(--text-tertiary)]'>{horoscopes[selected]?.career}</div>
            </div>
            <div className='glass p-3 rounded-lg text-center'>
              <div className='text-lg mb-1'>🍀</div>
              <div className='text-xs text-[var(--text-tertiary)]'>{horoscopes[selected]?.luck}</div>
            </div>
          </div>
        </div>
      )}

      <p className='mt-10 text-center text-xs text-[var(--text-tertiary)]'>娱乐仅供参考</p>
    </div>
  )
}