import { getLinkInfo } from "@/app/api/links/actions"
import { notFound } from "next/navigation"

export default async function InvitationPage({ params: {
  slug
} }: {
  params: {
    slug: string
  }
}
) {
  const linkInfo = await getLinkInfo(slug)
  if (!linkInfo) {
    return notFound()
  }

  return (<div>Invitation: {slug}</div>)
}
