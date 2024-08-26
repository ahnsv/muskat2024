import { getLinkInfo } from "@/app/api/links/actions";
import ProductDetail from "@/components/app/product-detail";
import { notFound } from "next/navigation";

export default async function ProductPage(
  { params: { slug } }: { params: { slug: string } }
) {
  const linkInfo = await getLinkInfo(slug);
  if (!linkInfo) {
    return notFound();
  }
  return (<ProductDetail linkInfo={linkInfo} />)
}
