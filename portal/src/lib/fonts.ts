import { DM_Sans, Space_Grotesk } from "next/font/google"

export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "700"],
  variable: "--font-dm-sans",
  display: "swap",
})

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
})
