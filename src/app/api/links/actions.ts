import { createClient } from "@/lib/supabase"

export async function getLinkInfo(slug: string) {
  const supabase = createClient()
  const { data, error } = await supabase.from('links').select('*').eq('slug', slug).single()
  if (error) {
    return null
  }
  return data
}
