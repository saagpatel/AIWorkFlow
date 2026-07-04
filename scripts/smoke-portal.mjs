const DEFAULT_BASE_URL = "https://aiworkflow-portal.vercel.app"

const baseUrl = normalizeBaseUrl(process.argv[2] ?? process.env.PORTAL_BASE_URL ?? DEFAULT_BASE_URL)
const authCookie = process.env.PORTAL_AUTH_COOKIE

const checks = [
  {
    name: "unlock page renders",
    run: async () => {
      const response = await request("/unlock")
      const body = await response.text()

      assertStatus(response, 200)
      assertIncludes(body, "AI Workflow Accelerator", "/unlock should include portal title")
      assertIncludes(body, "Enter Password", "/unlock should include password prompt")
    },
  },
  {
    name: "protected route redirects to unlock",
    run: async () => {
      const response = await request("/acme-corp/audit", { redirect: "manual" })
      const location = response.headers.get("location") ?? ""

      if (![307, 308].includes(response.status)) {
        throw new Error(`expected 307/308 redirect, got ${response.status}`)
      }

      assertIncludes(location, "/unlock", "protected route should redirect to unlock")
      assertIncludes(location, "client=acme-corp", "redirect should preserve client slug")
      assertIncludes(location, "redirect=%2Facme-corp%2Faudit", "redirect should preserve target path")
    },
  },
]

if (authCookie) {
  checks.push(
    {
      name: "authenticated audit page renders",
      run: async () => {
        const response = await request("/acme-corp/audit", {
          headers: { cookie: authCookie },
        })
        const body = await response.text()

        assertStatus(response, 200)
        assertIncludes(body, "AI Workflow Audit Report", "audit page should render report")
      },
    },
    {
      name: "authenticated metrics page renders",
      run: async () => {
        const response = await request("/acme-corp/metrics", {
          headers: { cookie: authCookie },
        })
        const body = await response.text()

        assertStatus(response, 200)
        assertIncludes(body, "Performance Metrics", "metrics page should render dashboard")
      },
    },
  )
}

try {
  for (const check of checks) {
    await check.run()
    console.log(`✓ ${check.name}`)
  }

  console.log(`Portal smoke passed for ${baseUrl}`)
} catch (error) {
  console.error(`Portal smoke failed for ${baseUrl}`)
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
}

function normalizeBaseUrl(value) {
  return value.replace(/\/+$/, "")
}

function request(pathname, options = {}) {
  return fetch(`${baseUrl}${pathname}`, options)
}

function assertStatus(response, expected) {
  if (response.status !== expected) {
    throw new Error(`expected HTTP ${expected}, got ${response.status}`)
  }
}

function assertIncludes(value, expected, message) {
  if (!value.includes(expected)) {
    throw new Error(message)
  }
}
