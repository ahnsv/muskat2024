import { createClient } from "@/lib/supabase";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = createClient();

  const values = await req.json()

  const { data, error } = await supabase.from('waitlist').insert(values).select("*")
  if (error) {
    console.error(error)
    return new Response(error.message, { status: 500 })
  }

  return Response.json(data)
}
