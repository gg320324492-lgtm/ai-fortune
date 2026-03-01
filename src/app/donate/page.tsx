'use client'

export default function Donate() {
  return (
    <div className='max-w-md mx-auto text-center'>
      <div className='text-5xl mb-4 animate-bounce-in'>☕</div>
      <h1 className='text-2xl font-bold mb-2 gradient-text-colorful'>支持一下</h1>
      <p className='text-sm text-[var(--text-secondary)] mb-8'>
        如果觉得好玩，可以请我喝杯咖啡~<br/>
        您的支持是我更新的动力！
      </p>

      <div className='grid grid-cols-2 gap-4 mb-8'>
        <div className='glass p-4'>
          <div className='text-3xl mb-2'>💚</div>
          <h3 className='font-medium mb-3'>微信</h3>
          <div className='rounded-lg overflow-hidden border border-[var(--border)]'>
            <img src='/wechat.jpg' alt='微信付款码' className='w-full' />
          </div>
        </div>
        
        <div className='glass p-4'>
          <div className='text-3xl mb-2'>💙</div>
          <h3 className='font-medium mb-3'>支付宝</h3>
          <div className='rounded-lg overflow-hidden border border-[var(--border)]'>
            <img src='/alipay.jpg' alt='支付宝付款码' className='w-full' />
          </div>
        </div>
      </div>

      <div className='glass p-4 mb-6'>
        <h3 className='font-medium mb-2'>💡 付款说明</h3>
        <div className='text-xs text-[var(--text-secondary)] text-left space-y-2'>
          <p>• 付款时请备注「命运之书」</p>
          <p>• 任意金额均可，一分也是爱~</p>
          <p>• 付款后截图联系客服开通 VIP</p>
        </div>
      </div>

      <div className='glass p-4'>
        <h3 className='font-medium mb-2'>🎁 VIP 权益</h3>
        <div className='text-xs text-[var(--text-secondary)] text-left space-y-1'>
          <p>• 每日无限次占卜</p>
          <p>• 专属 AI 解读</p>
          <p>• 历史记录永久保存</p>
        </div>
      </div>

      <p className='mt-8 text-xs text-[var(--text-tertiary)]'>
        付款遇到问题？请联系客服
      </p>
    </div>
  )
}