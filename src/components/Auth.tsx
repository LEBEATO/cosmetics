'use client'

import { LogIn, LogOut, User } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { logout } from '@/app/actions'
import { useRouter } from 'next/navigation'

// Mock da sessão para desenvolvimento.
// No futuro, substitua por: import { useSession } from 'next-auth/react'
const useSession = () => ({
  data: { user: { name: 'Usuário Teste', email: 'user@test.com' } },
  status: 'authenticated', // ou 'unauthenticated', 'loading'
})

export default function Auth() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      // Se logout falhar, redireciona manualmente
      router.push('/login')
    }
  }

  if (status === 'loading') {
    return <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-800" />
  }

  if (status === 'unauthenticated' || !session?.user) {
    return (
      <Link
        href="/login"
        className="flex transform items-center space-x-1 rounded-lg bg-gradient-to-br from-fuchsia-600 to-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xl shadow-fuchsia-500/60 transition duration-300 hover:scale-[1.02] hover:shadow-fuchsia-400/90 active:scale-95 sm:space-x-2 sm:px-4 sm:py-2 sm:text-base"
      >
        <LogIn className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="hidden sm:inline">Entrar</span>
        <span className="sm:hidden">Entrar</span>
      </Link>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Abrir menu do usuário"
        title="Abrir menu do usuário"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
      >
        <User className="h-5 w-5 text-gray-300" />
      </button>

      {isMenuOpen && (
        <div
          className="absolute right-0 mt-2 w-48 origin-top-right rounded-md border border-gray-700 bg-gray-800 shadow-lg"
          onMouseLeave={() => setIsMenuOpen(false)}
        >
          <div className="p-2">
            <div className="px-2 py-2">
              <p className="text-sm text-gray-200">Logado como</p>
              <p className="truncate font-medium text-white">
                {session.user.name}
              </p>
            </div>
            <div className="my-2 h-px w-full bg-gray-700" />
            <button
              onClick={handleLogout}
              className="flex w-full items-center rounded-md px-2 py-2 text-sm text-red-400 hover:bg-red-500/10"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  )
}