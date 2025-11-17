import LoginComponent from '@/components/Login'
import { Suspense } from 'react'

function LoginPageInternal() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4 bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="relative z-10 w-full max-w-md">
        <LoginComponent />
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="animate-pulse text-gray-400">Carregando...</div>
      </div>
    }>
      <LoginPageInternal />
    </Suspense>
  )
}

