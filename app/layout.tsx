import Loading from "@/components/Loading";
import Nav from "@/components/Nav";
import Toast from "@/components/Toast"
import type {Metadata} from 'next'
import './globals.css'
import {Suspense} from 'react';

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
      <body>
      <Suspense fallback={<Loading/>}>
        <Nav/>
        {children}
        <Toast/>
      </Suspense>
      </body>
      </html>
  )
}
