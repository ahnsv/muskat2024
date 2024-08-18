import { cookies } from 'next/headers'; // Import cookies handling
import { v4 as uuidv4 } from 'uuid';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';


export async function POST(req: NextRequest) {
  const supabase = createClient();
  const deviceCookie = cookies().get('device_id');
  let deviceId = deviceCookie?.value;

  if (!deviceId) {
    deviceId = uuidv4(); // Generate new UUID
    cookies().set('device_id', deviceId, { httpOnly: true });
    const expirationTime = new Date()
    expirationTime.setDate(expirationTime.getDate() + 1)
    await supabase.from("page_views").insert(
      {
        device_id: deviceId,
        view_count: 1,
        expire_at: expirationTime.toISOString()
      }
    )
  }

  const { data, error } = await supabase
    .from('page_views')
    .select('id, view_count')
    .eq('device_id', deviceId).single();

  if (error) {
    return NextResponse.json({ error: 'Error fetching view count' }, { status: 500 });
  }

  const viewCount = data?.view_count || 0;

  if (viewCount >= 5) {
    return NextResponse.json({ error: 'View limit exceeded' }, { status: 403 });
  }

  const { error: upsertError } = await supabase
    .from('page_views')
    .upsert({ id: data.id, device_id: deviceId, view_count: viewCount + 1 });

  if (upsertError) {
    console.error({ upsertError })
  }

  return NextResponse.json({ message: 'Page viewed successfully' });
}

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const deviceCookie = cookies().get('device_id');
  const deviceId = deviceCookie?.value;

  if (!deviceId) {
    return NextResponse.json({ error: 'Device not recognized' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('page_views')
    .select('view_count, expire_at')
    .eq('device_id', deviceId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'No views found for this device' }, { status: 404 });
  }

  const currentTime = new Date();
  if (!data.expire_at) {
    return NextResponse.json({ view_count: data.view_count, has_expired: false });
  }
  const expirationTime = new Date(data?.expire_at);
  const hasExpired = currentTime > expirationTime;

  return NextResponse.json({ view_count: data.view_count, has_expired: hasExpired });
}
