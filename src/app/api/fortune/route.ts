import { NextRequest, NextResponse } from 'next/server'

const API_KEY = process.env.MINIMAX_API_KEY || ''
const API_URL = 'https://api.minimax.chat/v1/text/chatcompletion_v2'

function buildPrompt(type: string, data: any): string {
  if (type === 'tarot' && data.card) {
    return '你是一个专业的塔罗牌解读师。请为用户解读塔罗牌' + data.card.name + '。关键词：' + data.card.keywords + '。请用200-300字的中文，给出深入、温暖、有洞察力的解读。强调这是娱乐仅供参考。'
  }
  
  if (type === 'zodiac' && data.zodiac) {
    return '你是一个专业的星座运势分析师。请为' + data.zodiac + '座用户提供今日运势解读。请用200-300字的中文，给出温暖正面的预测。强调这是娱乐仅供参考。'
  }
  
  if (type === 'name' && data.name) {
    return '你是一个专业的姓名学大师。请分析姓名' + data.name + '的五行属性。请用200-300字的中文，给出专业分析。强调这是娱乐仅供参考。'
  }
  
  if (type === 'love' && data.name1 && data.name2 && data.sign1 && data.sign2) {
    return '你是一个专业的爱情分析师。请为' + data.name1 + '（' + data.sign1 + '）和' + data.name2 + '（' + data.sign2 + '）进行深度爱情配对分析。请从以下几个维度进行分析（总共400-500字）：1. 整体缘分数（用百分比表示）2. 性格契合度分析3. 爱情优势4. 可能面临的挑战5. 相处建议。请用温暖专业的中文回复，最后强调这只是娱乐仅供参考。'
  }
  
  return ''
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const prompt = buildPrompt(data.type, data)
    
    if (!prompt) {
      return NextResponse.json({ content: '无效请求' })
    }
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + API_KEY
      },
      body: JSON.stringify({
        model: 'abab6.5s-chat',
        messages: [
          { role: 'system', content: '你是一个专业的命理分析师。' },
          { role: 'user', content: prompt }
        ]
      })
    })
    
    const result = await response.json()
    const content = result.choices?.[0]?.message?.content || '抱歉，AI解读暂时不可用。'
    
    return NextResponse.json({ content })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ content: '抱歉，AI解读暂时不可用。' }, { status: 500 })
  }
}