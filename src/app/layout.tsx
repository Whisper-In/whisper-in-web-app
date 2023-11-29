import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { Providers } from '@/store/provider'
import { Container } from '@mui/material'

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
  children,
  modal
}: {
  children: React.ReactNode,
  modal: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{
        height: "100dvh",
        width: "100vw",
        position: "fixed",
        overflow: "hidden",
        backgroundColor: "black"
      }}>
        <Providers>
          <Container sx={{
            position: "relative",
            height: "100%",
            width: "100%"
          }}>
            {modal}
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  )
}
