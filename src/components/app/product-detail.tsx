/**
 * v0 by Vercel.
 * @see https://v0.dev/t/AWypRMBnh2C
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client';

import { Button } from "@/components/ui/button"
import { Label } from "@radix-ui/react-label"
import { StarIcon } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"
import { Database } from "@/lib/database.types";

type ProductDetailProps = {
  linkInfo: Database['public']['Tables']['links']['Row'];
}

export default function ProductDetail({ linkInfo }: ProductDetailProps): JSX.Element {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 items-center">
        <div className="relative w-full h-[80vh] lg:h-auto">
          <img
            src="/placeholder.svg"
            alt="Product Image"
            width={1200}
            height={1600}
            className="object-cover w-full h-full"
            style={{ aspectRatio: "1200/1600", objectFit: "cover" }}
          />
        </div>
        <div className="px-4 md:px-6 py-12 lg:py-0 lg:pr-12 grid gap-6">
          <div>
            <HoverCard>
              <HoverCardTrigger>
                From {linkInfo?.owner ?? "Unknown"}
              </HoverCardTrigger>
              <HoverCardContent>
                The React Framework – created and maintained by @vercel.
              </HoverCardContent>
            </HoverCard>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">[매목농원] 샤인머스켓</h1>
            <p className="text-muted-foreground text-lg">2024년 추석 후회없는 선택</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-yellow-400" />
              <StarIcon className="w-5 h-5 fill-yellow-400" />
              <StarIcon className="w-5 h-5 fill-yellow-400" />
              <StarIcon className="w-5 h-5 fill-yellow-400" />
              <StarIcon className="w-5 h-5 fill-yellow-400" />
            </div>
            <div className="text-4xl font-bold">$99</div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="product-option" className="text-base font-bold">
              Product Option
            </Label>
            <RadioGroup id="product-option" defaultValue="option1" className="flex items-center gap-2">
              <Label
                htmlFor="option1"
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
              >
                <RadioGroupItem id="option1" value="option1" />
                2kg
              </Label>
              <Label
                htmlFor="option2"
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted"
              >
                <RadioGroupItem id="option2" value="option2" />
                4kg
              </Label>
            </RadioGroup>
          </div>
          <Button size="lg">Add to cart</Button>
        </div>
      </main>
    </div>
  )
}
