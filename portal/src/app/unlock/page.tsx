import { Suspense } from "react"
import { UnlockForm } from "@/components/unlock-form"
import { Skeleton } from "@/components/ui/skeleton"

export default function UnlockPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="mb-10 text-center">
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold">
          AI Workflow
          <span className="text-primary"> Accelerator</span>
        </h1>
      </div>
      <Suspense
        fallback={
          <div className="w-full max-w-sm space-y-4">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-11 w-full" />
          </div>
        }
      >
        <UnlockForm />
      </Suspense>
    </main>
  )
}
