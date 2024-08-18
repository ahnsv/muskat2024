import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from './database.types'
import { SUPABASE_PROJECT_ANON, SUPABASE_PROJECT_URL } from '@/constants'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    SUPABASE_PROJECT_URL!,
    SUPABASE_PROJECT_ANON,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
