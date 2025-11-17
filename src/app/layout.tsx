
import "./globals.css";
import React, { Suspense } from 'react'
import { Orbitron } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {Providers} from '@/app/Providers'

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-orbitron',
})

export const metadata = {
  title: 'Fortnite Shop - Neon Purple',
  description: 'Loja de cosméticos - projeto exemplo'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`bg-[#050014] text-zinc-100 font-sans ${orbitron.variable}`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Suspense fallback={<div className="h-16 bg-gray-950/70" />}>
              <Header />
            </Suspense>
            <main className="container flex-1 px-4 py-8 mx-auto">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}