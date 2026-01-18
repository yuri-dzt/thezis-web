export interface Session {
  id: string
  user_id: string
  refresh_token: string
  expires_at: number
  created_at: number
}