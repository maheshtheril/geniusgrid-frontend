import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GeniusGrid ERP",
  description: "Next-gen SaaS ERP platform with multi-tenant, multi-company support",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* App Container */}
          <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="p-4 border-b bg-card shadow-sm">
              <h1 className="text-xl font-bold tracking-tight">
                GeniusGrid ERP
              </h1>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-4">{children}</main>

            {/* Footer */}
            <footer className="p-4 border-t text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} GeniusGrid ERP. All rights reserved.
            </footer>
          </div>

          {/* Toast Notifications */}
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
