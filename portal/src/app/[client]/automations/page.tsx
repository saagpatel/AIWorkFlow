import { notFound } from "next/navigation"
import { getAutomations, getClientSlugs, hasClientContent } from "@/lib/content"
import { AutomationRow } from "@/components/automation-row"

export function generateStaticParams() {
  return getClientSlugs().map((slug) => ({ client: slug }))
}

export default async function AutomationsPage({
  params,
}: {
  params: Promise<{ client: string }>
}) {
  const { client } = await params
  if (!hasClientContent(client)) {
    notFound()
  }

  const automations = getAutomations(client)

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-8 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold">
        Automations
      </h2>
      <div className="flex flex-col gap-4">
        {automations.map((automation) => (
          <AutomationRow key={automation.name} automation={automation} />
        ))}
      </div>
    </div>
  )
}
