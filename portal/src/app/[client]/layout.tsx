import { getEngagement, getClientSlugs } from "@/lib/content"
import { ClientNav } from "@/components/client-nav"
import { StatusBadge } from "@/components/status-badge"
import { FOOTER_TEXT, CALENDLY_PLACEHOLDER } from "@/lib/constants"

export function generateStaticParams() {
  return getClientSlugs().map((slug) => ({ client: slug }))
}

export default async function ClientLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ client: string }>
}) {
  const { client } = await params
  const engagement = getEngagement(client)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-card">
        <div className="container flex items-center justify-between px-6 py-6">
          <div>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold">
              {engagement.company}
            </h1>
            <p className="mt-1 text-sm font-light text-muted-foreground">
              Client Portal
            </p>
          </div>
          <StatusBadge status={engagement.status} />
        </div>
      </header>

      <ClientNav clientSlug={client} />

      <main className="container flex-1 px-6 py-10">{children}</main>

      <footer className="border-t py-8">
        <div className="container flex flex-col items-center gap-3 px-6 text-center text-sm text-muted-foreground">
          <p className="font-light">{FOOTER_TEXT}</p>
          <a
            href={CALENDLY_PLACEHOLDER}
            className="font-bold text-primary transition-colors hover:text-primary/80"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a Call
          </a>
        </div>
      </footer>
    </div>
  )
}
