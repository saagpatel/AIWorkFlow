import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/status-badge"
import type { Automation } from "@/lib/types"

export function AutomationRow({ automation }: { automation: Automation }) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between gap-4 pt-6">
        <div className="min-w-0 flex-1">
          <h3 className="font-bold">{automation.name}</h3>
          <p className="mt-1 text-sm font-light text-muted-foreground">
            {automation.description}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Tool: {automation.tool}
          </p>
        </div>
        <StatusBadge status={automation.status} />
      </CardContent>
    </Card>
  )
}
