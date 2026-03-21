import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/status-badge"
import type { Engagement } from "@/lib/types"

const planLabels: Record<Engagement["plan"], string> = {
  audit: "AI Audit",
  sprint: "Implementation Sprint",
  retainer: "Monthly Retainer",
}

export function EngagementCard({ engagement }: { engagement: Engagement }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold">
            {engagement.company}
          </CardTitle>
          <StatusBadge status={engagement.status} />
        </div>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-light text-muted-foreground">Plan</dt>
            <dd className="mt-1 font-bold">{planLabels[engagement.plan]}</dd>
          </div>
          <div>
            <dt className="text-sm font-light text-muted-foreground">
              Status
            </dt>
            <dd className="mt-1 font-bold capitalize">{engagement.status}</dd>
          </div>
          <div>
            <dt className="text-sm font-light text-muted-foreground">
              Start Date
            </dt>
            <dd className="mt-1 font-bold">{engagement.start_date}</dd>
          </div>
          {engagement.end_date && (
            <div>
              <dt className="text-sm font-light text-muted-foreground">
                End Date
              </dt>
              <dd className="mt-1 font-bold">{engagement.end_date}</dd>
            </div>
          )}
          <div>
            <dt className="text-sm font-light text-muted-foreground">
              Contact
            </dt>
            <dd className="mt-1 font-bold">{engagement.contact.name}</dd>
            <dd className="text-sm text-muted-foreground">
              {engagement.contact.role}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-light text-muted-foreground">
              Email
            </dt>
            <dd className="mt-1 font-bold">{engagement.contact.email}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}
