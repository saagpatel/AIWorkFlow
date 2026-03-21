"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { unlockClient } from "@/app/unlock/actions"

export function UnlockForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const clientSlug = searchParams.get("client") ?? ""
  const redirectPath = searchParams.get("redirect") ?? `/${clientSlug}`

  const [error, setError] = useState<string | undefined>()
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsPending(true)
    setError(undefined)
    const result = await unlockClient(null, formData)
    setIsPending(false)
    if (result?.error) {
      setError(result.error)
    } else {
      router.push(redirectPath)
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold">
          Enter Password
        </CardTitle>
        <p className="text-sm font-light text-muted-foreground">
          This portal is password protected.
        </p>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="flex flex-col gap-4">
          <input type="hidden" name="client" value={clientSlug} />
          <input type="hidden" name="redirect" value={redirectPath} />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
            autoFocus
            className="h-11"
          />
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <Button type="submit" disabled={isPending} className="h-11 font-bold">
            {isPending ? "Verifying..." : "Unlock"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
