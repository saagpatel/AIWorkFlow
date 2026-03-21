import { getMetrics, getClientSlugs } from "@/lib/content"
import { MetricsChart } from "@/components/metrics-chart"

export function generateStaticParams() {
  return getClientSlugs().map((slug) => ({ client: slug }))
}

export default async function MetricsPage({
  params,
}: {
  params: Promise<{ client: string }>
}) {
  const { client } = await params
  const metrics = getMetrics(client)

  const grouped = new Map<string, typeof metrics>()
  for (const m of metrics) {
    const key = `${m.automation_name} — ${m.metric}`
    const existing = grouped.get(key) ?? []
    existing.push(m)
    grouped.set(key, existing)
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-8 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold">
        Performance Metrics
      </h2>
      <div className="flex flex-col gap-6">
        {Array.from(grouped.entries()).map(([title, data]) => (
          <MetricsChart key={title} title={title} data={data} />
        ))}
      </div>
    </div>
  )
}
