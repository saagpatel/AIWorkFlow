import { getEngagement, getClientSlugs } from "@/lib/content"
import { EngagementCard } from "@/components/engagement-card"

export function generateStaticParams() {
  return getClientSlugs().map((slug) => ({ client: slug }))
}

export default async function EngagementPage({
  params,
}: {
  params: Promise<{ client: string }>
}) {
  const { client } = await params
  const engagement = getEngagement(client)

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-8 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold">
        Engagement Overview
      </h2>
      <EngagementCard engagement={engagement} />
    </div>
  )
}
