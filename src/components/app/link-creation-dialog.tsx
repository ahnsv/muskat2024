"use client";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CopyIcon, LinkIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const LinkCreationDialog = () => {
  const [title, setTitle] = useState("")
  const [views, setViews] = useState(1)
  const [hours, setHours] = useState(24)
  const [generatedLink, setGeneratedLink] = useState("")

  const handleGenerateLink = async () => {
    const response = await fetch("/api/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        views,
        hours,
      }),
    })

    if (!response.ok) {
      // TODO: handle error
      return
    }
    const data = await response.json()

    // generate link
    setGeneratedLink(data?.link)
  }

  const GeneratedLinkBlock = () => generatedLink && (
    <div className="flex-1 space-y-2 flex flex-col">
      <div className="font-semibold">초대 링크</div>
      <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-2 justify-center">
        <span className="truncate text-sm text-muted-foreground">{generatedLink}</span>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => {
            navigator.clipboard.writeText(generatedLink)
          }}
        >
          <CopyIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="p-2">
          <LinkIcon width={15} className="mr-2" />
          <span>초대하기</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-left">
        <DialogHeader>
          <DialogTitle>링크 생성</DialogTitle>
          <DialogDescription>
            초대 링크를 생성합니다.
          </DialogDescription>
        </DialogHeader>
        {/* expiration */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="views">링크 이름/닉네임</Label>
            <Input id="views" type="text" className="text-left" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="험프리 회사" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="views">Views</Label>
              <Input id="views" type="number" min="1" defaultValue="10" max="20" className="text-right" value={views} onChange={(e) => setViews(parseInt(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hours">Hours</Label>
              <Input id="hours" type="number" min="1" defaultValue="24" max="72" className="text-right" value={hours} onChange={(e) => setHours(parseInt(e.target.value))} />
            </div>
          </div>
          <Button type="submit" className="w-full" onClick={handleGenerateLink}>
            Generate Link
          </Button>
        </div>
        <DialogFooter>
          <GeneratedLinkBlock />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default LinkCreationDialog
