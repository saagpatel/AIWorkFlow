import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const variants = {
  active: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
  building: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  paused: "bg-slate-100 text-slate-600 hover:bg-slate-100",
  completed: "bg-slate-100 text-slate-600 hover:bg-slate-100",
} as const

type StatusBadgeProps = {
  status: keyof typeof variants
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge variant="secondary" className={cn(variants[status], className)}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}
