import LoginComponent from '@/components/Login'
import { Suspense } from 'react'

function LoginPageInternal() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-fixed bg-center bg-cover font-inter bg-gray-950">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <LoginComponent />
    </div>
  )
}

export default function LoginPage() {
  return <Suspense><LoginPageInternal /></Suspense>
}