import ConfigureAmplifyClientSide from "@/components/ConfigureAmplify";
import Toast from "@/components/Toast"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'miPariente Backend App',
  description: 'Caregiver and provider app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Suspense>
        <Nav />
      </Suspense>
      <ConfigureAmplifyClientSide />
      {children}
      <Toast />
      </body>
    </html>
  )
}
