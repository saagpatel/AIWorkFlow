import { getAuditContent, getClientSlugs } from "@/lib/content"
import { MarkdownRenderer } from "@/components/markdown-renderer"

export function generateStaticParams() {
  return getClientSlugs().map((slug) => ({ client: slug }))
}

export default async function AuditPage({
  params,
}: {
  params: Promise<{ client: string }>
}) {
  const { client } = await params
  const content = getAuditContent(client)

  return (
    <div className="mx-auto max-w-3xl">
      <MarkdownRenderer content={content} />
    </div>
  )
}
