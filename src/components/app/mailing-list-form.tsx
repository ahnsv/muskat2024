'use client';

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/vwUWAZ1czuO
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import validator from 'validator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useEffect, useState } from "react";
import { Database } from "@/lib/database.types";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "성명은 최소 2자 이상이어야 합니다.",
  }),
  email: z.string().email({
    message: "전자우편 주소가 유효하지 않습니다.",
  }),
  phone: z.string().min(10, {
    message: "전화번호는 최소 10자리 이상이어야 합니다.",
  }).refine(value => validator.isMobilePhone(value, 'ko-KR'), {
    message: "전화번호가 유효하지 않습니다.",
  })
})

export default function MailingListForm() {
  const [waitlistRecord, setWaitlistRecord] = useState<Database['public']['Tables']['waitlist']['Row'] | null>(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
    if (!response.ok) {
      alert('문제가 발생했습니다. 다시 시도해주세요.')
      return
    }
    const waitlistRecord = await response.json()
    setWaitlistRecord(waitlistRecord[0])
    setHasSubmitted(true)
  }

  useEffect(() => {
    const sendEmail = async () => {
      const response = await fetch(`/api/waitlist/email/${waitlistRecord?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ waitlistID: waitlistRecord?.id })
      })

      if (!response.ok) {
        alert('문제가 발생했습니다. 다시 시도해주세요.')
        return
      }

      console.log('Email sent')
    }

    if (hasSubmitted && waitlistRecord?.id) {
      sendEmail()
    }
  }, [hasSubmitted, waitlistRecord?.id])

  if (hasSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary to-primary-foreground">
        <Card className="max-w-md w-full p-6 sm:p-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">🌹감사합니다</CardTitle>
            <CardDescription className="text-muted-foreground">
              당신의 연락를 기다리고 있습니다.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

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
          <Form {...form}>
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>성명</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="사람의 성명은 무엇인가요?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>전자우편</FormLabel>
                  <FormControl>
                    <Input id="email" type="email" placeholder="사람의 전자우편은 무엇인가요?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>손 전화 번호</FormLabel>
                  <FormControl>
                    <Input id="phone" type="tel" placeholder="손 전화 번호" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" className="w-full mt-2">
                주목하기
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
