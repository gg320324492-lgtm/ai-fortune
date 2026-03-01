import './globals.css'
import type { Metadata } from 'next'
import { UserProvider } from '@/lib/UserContext'

export const metadata: Metadata = {
  title: '命运之书 | AI 智能命理',
  description: 'AI塔罗牌、星座运势、姓名分析 - 结合古老智慧与AI技术的智能命理体验',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='zh-CN'>
      <body className='min-h-screen relative'>
        <UserProvider>
          <div className='fixed inset-0 bg-stars'></div>
          <div className='orb orb-1'></div>
          <div className='orb orb-2'></div>
          <div className='orb orb-3'></div>
          
          <header className='fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-xl'>
            <div className='max-w-4xl mx-auto px-5 h-16 flex items-center justify-between'>
              <a href='/' className='text-lg font-semibold text-white flex items-center gap-2'>
                <span className='text-2xl animate-float'>🔮</span>
                命运之书
              </a>
              <div className='flex items-center gap-1'>
                <a href='/tarot' className='px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-white hover:bg-[var(--surface)] rounded-lg transition'>🃏 塔罗</a>
                <a href='/zodiac' className='px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-white hover:bg-[var(--surface)] rounded-lg transition'>⭐ 星座</a>
                <a href='/love' className='px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-white hover:bg-[var(--surface)] rounded-lg transition'>💕 爱情</a>
                <a href='/name' className='px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-white hover:bg-[var(--surface)] rounded-lg transition'>✍️ 姓名</a>
                <a href='/donate' className='px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-white hover:bg-[var(--surface)] rounded-lg transition'>☕ 支持</a>
                <a href='/history' className='px-3 py-2 text-sm text-[var(--text-secondary)] hover:text-white hover:bg-[var(--surface)] rounded-lg transition'>📜 历史</a>
              </div>
            </div>
          </header>
          
          <main className='pt-24 pb-12 px-4 relative z-10'>
            {children}
          </main>
          
          <footer className='border-t border-[var(--border)] py-8 text-center relative z-10'>
            <p className='text-xs text-[var(--text-tertiary)]'>娱乐仅供参考，请勿迷信</p>
          </footer>
        </UserProvider>
      </body>
    </html>
  )
}