import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { Providers } from '@/store/provider'
import { Container, Stack } from '@mui/material'
import DesktoViewPrompt from './_components/desktop-view-prompt.component'

config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Whisper In',
  description: 'Whisper In App',
  appleWebApp: {
    statusBarStyle: "black-translucent",
    capable: true
  },
  themeColor: "#121212",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover"
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}
        style={{
          backgroundColor: "black"
        }}>
        <Providers>
          <Container>
            <Stack minHeight="100dvh"
              position="relative">
              {children}
            </Stack>
          </Container>

          <DesktoViewPrompt />
        </Providers>
      </body>
    </html>
  )
}
