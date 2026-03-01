'use client'
import { useUser } from '@/lib/UserContext'

const typeLabels: Record<string, string> = {
  tarot: '🔮 塔罗牌',
  zodiac: '⭐ 星座运势',
  name: '✍️ 姓名分析',
  love: '💕 爱情配对'
}

export default function History() {
  const { user, dailyCount } = useUser()
  const history = user?.history || []

  return (
    <div className='max-w-2xl mx-auto'>
      <div className='text-center mb-8'>
        <div className='text-5xl mb-4 animate-bounce-in'>📜</div>
        <h1 className='text-2xl font-bold mb-2 gradient-text-colorful'>历史记录</h1>
        <p className='text-sm text-[var(--text-secondary)]'>今日已使用 {dailyCount}/3 次</p>
      </div>

      <div className='glass p-4 mb-6'>
        <div className='flex justify-between text-xs text-[var(--text-secondary)] mb-2'>
          <span>今日次数</span>
          <span>{dailyCount}/3</span>
        </div>
        <div className='h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden'>
          <div 
            className='h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500'
            style={{ width: (dailyCount / 3 * 100) + '%' }}
          ></div>
        </div>
        <p className='text-xs text-[var(--text-tertiary)] mt-2'>每天可免费使用3次，明日重置</p>
      </div>

      {history.length === 0 ? (
        <div className='glass p-8 text-center'>
          <div className='text-4xl mb-4'>📭</div>
          <p className='text-[var(--text-secondary)]'>暂无记录</p>
          <p className='text-xs text-[var(--text-tertiary)] mt-2'>开始你的第一次占卜吧！</p>
          <a href='/tarot' className='inline-block mt-4 btn-primary px-6 py-2 text-sm'>
            开始占卜
          </a>
        </div>
      ) : (
        <div className='space-y-3'>
          {history.map((item) => (
            <div key={item.id} className='glass p-4 animate-fade-in'>
              <div className='flex items-center justify-between mb-2'>
                <span className='text-sm font-medium'>{typeLabels[item.type] || item.type}</span>
                <span className='text-xs text-[var(--text-tertiary)]'>
                  {new Date(item.timestamp).toLocaleString('zh-CN')}
                </span>
              </div>
              <p className='text-sm text-[var(--text-secondary)] line-clamp-3'>
                {item.result}
              </p>
            </div>
          ))}
        </div>
      )}

      <p className='mt-8 text-center text-xs text-[var(--text-tertiary)]'>数据保存在本地浏览器中</p>
    </div>
  )
}