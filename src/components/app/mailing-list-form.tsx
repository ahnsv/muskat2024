'use client';

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/vwUWAZ1czuO
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function MailingListForm() {
  // TODO: implement form submission
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary to-primary-foreground">
      <Card className="max-w-md w-full p-6 sm:p-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">당신의 연락처를 써주세요</CardTitle>
          <CardDescription className="text-muted-foreground">
            고당도 샤-인머스켓을 만나보세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input id="name" placeholder="당신의 이름은 무엇인가요?" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" type="email" placeholder="이메일은 무엇인가요?" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">휴대전화 번호</Label>
              <Input id="phone" type="tel" placeholder="휴대전화번호" />
            </div>
            <Button type="submit" className="w-full mt-2">
              구독하기
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
