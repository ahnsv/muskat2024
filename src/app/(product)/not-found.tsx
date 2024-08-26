import Link from "next/link"

export default function ProductNotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        {/* <img */}
        {/*   src="/placeholder.svg" */}
        {/*   width={200} */}
        {/*   height={200} */}
        {/*   alt="404 Grape" */}
        {/*   className="mx-auto mb-6" */}
        {/*   style={{ aspectRatio: "200/200", objectFit: "cover" }} */}
        {/* /> */}
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">페이지를 찾을 수 없습니다</h1>
        <p className="mt-4 text-muted-foreground">
          찾고 계신 페이지가 존재하지 않습니다. 다시 시도해 보시기 바랍니다.
        </p>
        <div className="mt-6">
          <Link
            href="#"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
