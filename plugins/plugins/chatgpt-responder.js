import fetch from 'node-fetch' // asegúrate que tu entorno tenga esto disponible

const handler = async (m, { text, conn }) => {
  if (!text.toLowerCase().includes('bot')) return

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer TU_API_KEY',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: text }],
    }),
  })

  const data = await response.json()
  const reply = data.choices?.[0]?.message?.content || 'Lo siento, no entendí.'

  await conn.reply(m.chat, reply, m)
}

handler.customPrefix = /bot/i
handler.command = new RegExp // evitar que sea tratado como comando regular

export default handler