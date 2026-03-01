import Link from 'next/link'

const features = [
  { title: '塔罗牌', emoji: '🃏', desc: '抽取塔罗牌，AI 为你深度解读命运走向', href: '/tarot', color: 'from-purple-500 to-pink-500', icon: '🔮' },
  { title: '星座运势', emoji: '⭐', desc: '12星座每日运势，掌控你的命运齿轮', href: '/zodiac', color: 'from-blue-500 to-cyan-500', icon: '🌟' },
  { title: '爱情配对', emoji: '💕', desc: '两人星座配对分析，探索你们的缘分', href: '/love', color: 'from-pink-500 to-rose-500', icon: '💕' },
  { title: '姓名分析', emoji: '✍️', desc: '姓名蕴含的命运密码，揭示人生轨迹', href: '/name', color: 'from-amber-500 to-orange-500', icon: '📝' }
]

export default function Home() {
  return (
    <div className='max-w-3xl mx-auto'>
      <div className='text-center py-12 relative'>
        <div className='text-7xl mb-6 animate-bounce-in'>🔮</div>
        <h1 className='text-3xl font-bold mb-3 gradient-text-colorful'>探索你的命运</h1>
        <p className='text-sm text-[var(--text-secondary)] max-w-sm mx-auto mb-6 leading-relaxed'>
          结合古老神秘学智慧与前沿 AI 技术<br/>为你开启独特的命运探索之旅
        </p>
        
        <div className='flex justify-center gap-2 flex-wrap'>
          <span className='glass px-3 py-1.5 text-xs flex items-center gap-1'>
            <span>🤖</span> AI 智能解读
          </span>
          <span className='glass px-3 py-1.5 text-xs flex items-center gap-1'>
            <span>📊</span> 深度分析
          </span>
          <span className='glass px-3 py-1.5 text-xs flex items-center gap-1'>
            <span>✨</span> 每日更新
          </span>
        </div>
      </div>

      <div className='grid gap-3 mb-8 stagger'>
        {features.map((f) => (
          <Link key={f.href} href={f.href}>
            <div className='glass card-hover p-4 flex items-center gap-4 group'>
              <div className={'w-12 h-12 rounded-xl bg-gradient-to-br ' + f.color + ' flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform'}>
                {f.icon}
              </div>
              <div className='flex-1'>
                <h3 className='font-semibold text-white mb-0.5'>{f.title}</h3>
                <p className='text-xs text-[var(--text-secondary)]'>{f.desc}</p>
              </div>
              <div className='text-xl text-[var(--text-tertiary)] group-hover:text-white transition-colors'>→</div>
            </div>
          </Link>
        ))}
      </div>

      <div className='grid grid-cols-3 gap-3 mb-8'>
        <div className='glass p-4 text-center'>
          <div className='text-2xl font-bold gradient-text-colorful mb-1'>50K+</div>
          <div className='text-xs text-[var(--text-tertiary)]'>累计占卜</div>
        </div>
        <div className='glass p-4 text-center'>
          <div className='text-2xl font-bold gradient-text-colorful mb-1'>12K+</div>
          <div className='text-xs text-[var(--text-tertiary)]'>活跃用户</div>
        </div>
        <div className='glass p-4 text-center'>
          <div className='text-2xl font-bold gradient-text-colorful mb-1'>4.8⭐</div>
          <div className='text-xs text-[var(--text-tertiary)]'>用户评分</div>
        </div>
      </div>

      <div className='text-center'>
        <Link href='/tarot' className='inline-block btn-primary px-10 py-4 text-base glow-purple'>
          🔮 开始占卜
        </Link>
      </div>
    </div>
  )
}