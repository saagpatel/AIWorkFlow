import { describe, expect, it } from "vitest"
import { createAuthToken, isValidAuthToken } from "./auth-token"

describe("auth token", () => {
  it("validates tokens created for the same client and password", async () => {
    const token = await createAuthToken("acme-corp", "secret")

    await expect(isValidAuthToken("acme-corp", "secret", token)).resolves.toBe(
      true
    )
  })

  it("rejects guessed legacy cookie values", async () => {
    await expect(
      isValidAuthToken("acme-corp", "secret", "authenticated")
    ).resolves.toBe(false)
  })

  it("rejects tokens for a different client or password", async () => {
    const token = await createAuthToken("acme-corp", "secret")

    await expect(isValidAuthToken("demo-co", "secret", token)).resolves.toBe(
      false
    )
    await expect(
      isValidAuthToken("acme-corp", "different-secret", token)
    ).resolves.toBe(false)
  })
})
