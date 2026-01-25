import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Sommerhus i Dyreborg - Book et dejligt Sommerhus getaway",
  description: "Book din drømme sommerhusferie med Sommerhus i Dyreborg. Nyd udsigt og afslapning.",
  generator: 'v0.dev',
  icons: {
    icon: '/SommerhusLogo.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'