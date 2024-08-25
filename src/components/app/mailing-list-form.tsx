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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
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
