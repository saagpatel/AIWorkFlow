"use server"

import { cookies } from "next/headers"

export async function unlockClient(
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  const password = formData.get("password") as string
  const clientSlug = formData.get("client") as string
  const redirect = (formData.get("redirect") as string) || `/${clientSlug}`

  if (!clientSlug || !password) {
    return { error: "Password is required." }
  }

  const envKey = `CLIENT_PASSWORD_${clientSlug.replace(/-/g, "_").toUpperCase()}`
  const expected = process.env[envKey]

  if (!expected) {
    return { error: "Client not found." }
  }

  if (password !== expected) {
    return { error: "Incorrect password." }
  }

  const cookieStore = await cookies()
  cookieStore.set(`portal_auth_${clientSlug}`, "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })

  // Return empty — the client component will handle redirect
  return {}
}
