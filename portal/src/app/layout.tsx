import type { Metadata } from "next"
import { dmSans, spaceGrotesk } from "@/lib/fonts"
import "./globals.css"

export const metadata: Metadata = {
  title: "AI Workflow Accelerator — Client Portal",
  description: "Access your audit reports, automation metrics, and engagement status.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${spaceGrotesk.variable} font-[family-name:var(--font-dm-sans)] antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  )
}
