import Loading from "@/components/Loading";
import Toast from "@/components/Toast"
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'
import {Suspense} from 'react';
import Nav from "@/components/Nav";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'miPariente Backend App',
  description: 'Caregiver and provider app',
}

import config from "@/amplifyconfiguration.json";
import {Amplify} from "aws-amplify";

Amplify.configure(config, {ssr: true});

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <body className={inter.className}>
      <Suspense fallback={<Loading/>}>
        <Nav/>
        {children}
        <Toast/>
      </Suspense>
      </body>
      </html>
  )
}
