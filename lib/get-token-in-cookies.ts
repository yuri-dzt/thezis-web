'use server'

import { cookies } from 'next/headers'

export const getTokenInCookies = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')
  return token ? String(token.value) : ''
}