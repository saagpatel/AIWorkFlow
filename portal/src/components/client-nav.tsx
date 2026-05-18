"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { NAV_ITEMS } from "@/lib/constants"

export function ClientNav({ clientSlug }: { clientSlug: string }) {
  const pathname = usePathname()

  return (
    <nav className="border-b">
      <div className="container flex flex-wrap gap-1 px-6 py-2 sm:flex-nowrap">
        {NAV_ITEMS.map((item) => {
          const href = `/${clientSlug}${item.href}`
          const isActive =
            item.href === ""
              ? pathname === `/${clientSlug}`
              : pathname === href

          return (
            <Link
              key={item.label}
              href={href}
              className={cn(
                "whitespace-nowrap rounded-md px-4 py-2 text-sm font-bold transition-colors duration-150",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
