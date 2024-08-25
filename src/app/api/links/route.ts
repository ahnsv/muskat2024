import { createClient } from "@/lib/supabase";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {

  const { views, hours, title } = await req.json()

  const slug = title.toLowerCase().replace(/ /g, "-");

  const supabase = createClient();

  const { data, error } = await supabase
    .from("links")
    .insert({ name: title, slug }).select();

  if (error) {
    console.error(error);
    return new Response(error.message, {
      status: 500,
    });
  }

  const { data: viewsData, error: viewsError } = await supabase
    .from("page_views")
    .insert([{ link: data[0].slug, max_view: views, expire_at: new Date(Date.now() + hours * 60 * 60 * 1000).toISOString() }]).select();

  if (viewsError) {
    console.error(viewsError);
    return new Response(viewsError.message, {
      status: 500,
    });
  }

  return new Response(JSON.stringify({
    link: data[0].slug,
    views: viewsData[0].max_view,
    expire_at: viewsData[0].expire_at,
  }), { status: 200 })

}
