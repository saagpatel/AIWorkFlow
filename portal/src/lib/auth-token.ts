const encoder = new TextEncoder()

export async function createAuthToken(
  clientSlug: string,
  password: string
): Promise<string> {
  const signature = await sign(clientSlug, password)
  return `v1.${signature}`
}

export async function isValidAuthToken(
  clientSlug: string,
  password: string,
  token?: string
): Promise<boolean> {
  if (!token?.startsWith("v1.")) return false

  const expected = await createAuthToken(clientSlug, password)
  return timingSafeEqual(token, expected)
}

async function sign(clientSlug: string, password: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(`portal-auth:${clientSlug}`)
  )
  return bytesToHex(new Uint8Array(signature))
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  )
}

function timingSafeEqual(left: string, right: string): boolean {
  if (left.length !== right.length) return false

  let result = 0
  for (let index = 0; index < left.length; index += 1) {
    result |= left.charCodeAt(index) ^ right.charCodeAt(index)
  }
  return result === 0
}
