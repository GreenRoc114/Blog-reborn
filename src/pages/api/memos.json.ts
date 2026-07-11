import type { APIRoute } from 'astro'
import { fetchTelegramChannel } from '../../utils/telegram'

export const prerender = false

const CHANNEL = 'greenroc114life'

export const GET: APIRoute = async () => {
  const memos = await fetchTelegramChannel(CHANNEL)

  return new Response(JSON.stringify({ channel: CHANNEL, memos }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // 边缘缓存 60s，随后 10 分钟内 stale-while-revalidate
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=600',
    },
  })
}
