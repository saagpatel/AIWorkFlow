import { describe, it, expect } from "vitest"
import {
  isPublicPath,
  extractClientSlug,
  slugToEnvKey,
  isAuthorizedClient,
} from "./middleware"
import { createAuthToken } from "./lib/auth-token"

describe("isPublicPath", () => {
  it("should return true for root path", () => {
    expect(isPublicPath("/")).toBe(true)
  })

  it("should return true for unlock path", () => {
    expect(isPublicPath("/unlock")).toBe(true)
  })

  it("should return false for client paths", () => {
    expect(isPublicPath("/acme-corp")).toBe(false)
  })

  it("should return false for nested client paths", () => {
    expect(isPublicPath("/acme-corp/audit")).toBe(false)
  })
})

describe("extractClientSlug", () => {
  it("should extract slug from client path", () => {
    expect(extractClientSlug("/acme-corp")).toBe("acme-corp")
  })

  it("should extract slug from nested client path", () => {
    expect(extractClientSlug("/acme-corp/audit")).toBe("acme-corp")
  })

  it("should return null for unlock path", () => {
    expect(extractClientSlug("/unlock")).toBeNull()
  })

  it("should return null for _next paths", () => {
    expect(extractClientSlug("/_next/static/chunk.js")).toBeNull()
  })

  it("should return null for api paths", () => {
    expect(extractClientSlug("/api/health")).toBeNull()
  })

  it("should return null for root path", () => {
    expect(extractClientSlug("/")).toBeNull()
  })
})

describe("slugToEnvKey", () => {
  it("should convert slug to env key format", () => {
    expect(slugToEnvKey("acme-corp")).toBe("CLIENT_PASSWORD_ACME_CORP")
  })

  it("should handle single word slugs", () => {
    expect(slugToEnvKey("acme")).toBe("CLIENT_PASSWORD_ACME")
  })

  it("should handle multi-hyphen slugs", () => {
    expect(slugToEnvKey("my-big-company")).toBe(
      "CLIENT_PASSWORD_MY_BIG_COMPANY"
    )
  })
})

describe("isAuthorizedClient", () => {
  it("accepts a signed token for the matching client password", async () => {
    const token = await createAuthToken("acme-corp", "secret")

    await expect(
      isAuthorizedClient("acme-corp", token, {
        CLIENT_PASSWORD_ACME_CORP: "secret",
      })
    ).resolves.toBe(true)
  })

  it("rejects guessed legacy cookie values", async () => {
    await expect(
      isAuthorizedClient("acme-corp", "authenticated", {
        CLIENT_PASSWORD_ACME_CORP: "secret",
      })
    ).resolves.toBe(false)
  })

  it("rejects missing client passwords", async () => {
    const token = await createAuthToken("acme-corp", "secret")

    await expect(isAuthorizedClient("acme-corp", token, {})).resolves.toBe(
      false
    )
  })
})
