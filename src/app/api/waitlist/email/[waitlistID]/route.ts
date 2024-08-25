import { createClient } from "@/lib/supabase";
import { NextRequest } from "next/server";
import nodemailer from 'nodemailer';


export async function POST(req: NextRequest) {
  const supabase = createClient();
  const RESEND_API_KEY = process.env.RESEND_API_KEY! as string
  const { waitlistID } = await req.json()
  const { data, error } = await supabase.from('waitlist').select("*").eq('id', waitlistID)
  if (error) {
    console.error(error)
    return new Response(error.message, { status: 500 })
  }
  const { email, name, phone } = data?.[0]
  if (!email) {
    return new Response('Email not found', { status: 404 })
  }
  const transporter = nodemailer.createTransport({
    host: 'smtp.resend.com',
    secure: true,
    port: 465,
    auth: {
      user: 'resend',
      pass: RESEND_API_KEY,
    },
  });

  const info = await transporter.sendMail({
    from: '안자오밍 <team@talk.humphreyahn.dev>',
    to: email,
    subject: '[2024 샤인머스켓] 메일링 리스트 정보 등록 안내',
    html: `
<style>
  body, h1, h2, h3, h4, h5, h6, p, td, th {
    font-family: 'IBM Plex Mono', monospace;
  }

  .container {
    background-color: #d9d9d9; /* Equivalent to --background */
    color: #1a1a1a; /* Equivalent to --foreground */
    padding: 32px;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  .header {
    font-size: 24px;
    font-weight: bold;
  }

  .text-muted {
    color: #4d4d4d; /* Equivalent to --muted-foreground */
  }

  .table-container {
    overflow: hidden;
    border-radius: 8px;
    border: 1px solid #999999; /* Equivalent to --border */
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 8px 16px;
    text-align: left;
  }

  thead {
    background-color: #b3b3b3; /* Equivalent to --muted */
    color: #1a1a1a; /* Equivalent to --muted-foreground */
  }

  tbody tr {
    border-top: 1px solid #cccccc; /* Equivalent to --muted */
  }

  img {
    filter: sepia(0.3) hue-rotate(-60deg) saturate(0.5) opacity(0.8);
  }
</style>
<div class="container">
  <div class="space-y-4">
    <h1 class="header">정보가 정상적으로 입력되었습니다.</h1>
    <p class="text-muted">
      아래는 현재 메일링 리스트에 등록된 정보입니다. 정보가 정확한지 확인해주세요.
    </p>
    <p class="text-muted">
      만약에 정보가 잘못되었다면, 아래의 정보를 확인하신 후, <a href="https://talk.humphreyahn.dev/waitlist/update">이 링크</a>를 통해 수정해주세요.
    </p>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${name}</td>
            <td>${email}</td>
            <td>${phone}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>`,
  });

  return Response.json(info)
}
