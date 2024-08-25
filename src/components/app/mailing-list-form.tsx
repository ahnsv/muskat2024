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
          <CardTitle className="text-2xl font-bold">🌹사람의 연락처를 써주세요</CardTitle>
          <CardDescription className="text-muted-foreground">
            높은 당도 샤-인머스켓 알맹이를 만나보세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">성명</Label>
              <Input id="name" placeholder="사람의 성명은 무엇인가요?" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">전자우편</Label>
              <Input id="email" type="email" placeholder="사람의 전자우편은 무엇인가요?" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">손 전화 번호</Label>
              <Input id="phone" type="tel" placeholder="손 전화 번호" />
            </div>
            <Button type="submit" className="w-full mt-2">
              주목하기
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
