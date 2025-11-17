'use client'

import React, { useState, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { signup, login } from '@/app/actions'
import { Mail, Lock, User, Loader2, LogIn, UserPlus, AlertCircle, CheckCircle } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'

// Componente para o botão de submit, que mostra o estado de carregamento
function SubmitButton({ isLogin }: { isLogin: boolean }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className="flex items-center justify-center w-full px-4 py-3 font-bold text-white transition duration-300 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 hover:shadow-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 animate-spin" size={20} />
          {isLogin ? 'Entrando...' : 'Cadastrando...'}
        </>
      ) : (
        <>
          {isLogin ? (
            <LogIn className="mr-2" size={20} />
          ) : (
            <UserPlus className="mr-2" size={20} />
          )}
          {isLogin ? 'Entrar' : 'Cadastrar'}
        </>
      )}
    </button>
  )
}

const LoginComponent: React.FC<{ onLoginSuccess?: () => void }> = ({
  onLoginSuccess,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLogin, setIsLogin] = useState<boolean>(
    searchParams.get('action') !== 'register',
  )
  const [loginState, loginAction] = useFormState(login, undefined)
  const [signupState, signupAction] = useFormState(signup, undefined)

  const [message, setMessage] = useState<{
    text: string
    type: 'success' | 'error'
  } | null>(null)

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setMessage({
        text: 'Cadastro realizado com sucesso! Faça o login.',
        type: 'success',
      })
      // Limpa o parâmetro da URL para não mostrar a mensagem novamente ao recarregar
      const callbackUrl = searchParams.get('callbackUrl')
      router.replace(callbackUrl ? `/login?callbackUrl=${callbackUrl}` : '/login')
    }
  }, [searchParams, router])

  // Redirecionar após login bem-sucedido
  useEffect(() => {
    const state = isLogin ? loginState : signupState
    if (state?.type === 'success') {
      const callbackUrl = searchParams.get('callbackUrl')
      if (callbackUrl) {
        router.push(decodeURIComponent(callbackUrl))
      } else {
        router.push('/')
      }
    }
  }, [loginState, signupState, isLogin, searchParams, router])

  useEffect(() => {
    const state = isLogin ? loginState : signupState
    if (state?.message) {
      setMessage({
        text: state.message,
        type: state.type === 'success' ? 'success' : 'error',
      })
    }
  }, [loginState, signupState, isLogin])

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setMessage(null)
  }

  const messageClasses =
    message?.type === 'error'
      ? 'bg-red-900/30 text-red-300 border-red-500/50'
      : 'bg-green-900/30 text-green-300 border-green-500/50'

  return (
    <div className="relative z-10 w-full max-w-md p-6 bg-gray-900/90 border border-gray-700/50 shadow-2xl backdrop-blur-sm md:p-10 rounded-2xl">
      <div className="mb-6 text-center">
        <h1 className="mb-2 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta'}
        </h1>
        <p className="text-sm text-gray-400">
          {isLogin ? 'Entre para acessar sua área' : 'Cadastre-se para começar'}
        </p>
      </div>

      {message?.text && (
        <div
          className={`flex items-center gap-2 p-3 mb-6 rounded-xl border transition-all duration-300 ${messageClasses}`}
          role="alert"
        >
          {message.type === 'error' ? (
            <AlertCircle className="flex-shrink-0" size={18} />
          ) : (
            <CheckCircle className="flex-shrink-0" size={18} />
          )}
          <p className="text-sm">{message.text}</p>
        </div>
      )}

      <form action={isLogin ? loginAction : signupAction} className="space-y-5">
        {!isLogin && (
          <div>
            <label htmlFor="name" className="sr-only">
              Nome
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 pointer-events-none">
                <User size={20} />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Seu nome completo"
                required={!isLogin}
                className="w-full py-3 pl-12 pr-4 text-gray-100 placeholder-gray-500 transition duration-150 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none disabled:opacity-50"
              />
            </div>
          </div>
        )}

        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 pointer-events-none">
              <Mail size={20} />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email@exemplo.com"
              required
              className="w-full py-3 pl-12 pr-4 text-gray-100 placeholder-gray-500 transition duration-150 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none disabled:opacity-50"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Senha
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 pointer-events-none">
              <Lock size={20} />
            </div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Sua senha"
              required
              minLength={6}
              className="w-full py-3 pl-12 pr-4 text-gray-100 placeholder-gray-500 transition duration-150 bg-gray-800/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none disabled:opacity-50"
            />
          </div>
        </div>

        <SubmitButton isLogin={isLogin} />
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400">
          {isLogin ? 'Novo por aqui?' : 'Já tem uma conta?'}
          <button
            onClick={toggleMode}
            type="button"
            className="ml-2 font-semibold text-blue-400 transition duration-150 hover:text-blue-300 focus:outline-none focus:underline"
          >
            {isLogin ? 'Crie sua conta' : 'Fazer login'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default LoginComponent
