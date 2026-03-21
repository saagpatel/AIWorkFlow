import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PUBLIC_PATHS = ["/", "/unlock"]

export function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.includes(pathname)
}

export function extractClientSlug(pathname: string): string | null {
  const match = pathname.match(/^\/([a-z0-9-]+)/)
  if (!match) return null
  const slug = match[1]
  if (slug === "unlock" || slug === "_next" || slug === "api") return null
  return slug
}

export function slugToEnvKey(slug: string): string {
  return `CLIENT_PASSWORD_${slug.replace(/-/g, "_").toUpperCase()}`
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (isPublicPath(pathname)) {
    return NextResponse.next()
  }

  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next()
  }

  const slug = extractClientSlug(pathname)
  if (!slug) return NextResponse.next()

  const cookieName = `portal_auth_${slug}`
  const authCookie = request.cookies.get(cookieName)

  if (authCookie?.value === "authenticated") {
    return NextResponse.next()
  }

  const unlockUrl = new URL("/unlock", request.url)
  unlockUrl.searchParams.set("client", slug)
  unlockUrl.searchParams.set("redirect", pathname)
  return NextResponse.redirect(unlockUrl)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
