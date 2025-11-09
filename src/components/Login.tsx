'use client'

import React, { useState, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { signup, login } from '@/app/actions'
import { Mail, Lock, User, Loader2, LogIn, UserPlus } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'

// Componente para o botão de submit, que mostra o estado de carregamento
function SubmitButton({ isLogin }: { isLogin: boolean }) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className="flex items-center justify-center w-full px-4 py-3 font-bold text-white transition duration-300 bg-blue-600 shadow-md rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 hover:shadow-lg hover:bg-blue-700 disabled:bg-blue-400"
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
      router.replace('/login')
    }
  }, [searchParams, router])

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
      ? 'bg-red-900/20 text-red-400 border-red-500/50'
      : 'bg-green-900/20 text-green-400 border-green-500/50'

  return (
    <div className="relative z-10 w-full max-w-md p-6 bg-gray-900 border border-gray-700 shadow-2xl bg-opacity-80 md:p-10 rounded-2xl backdrop-blur-sm">
      <h1 className="mb-2 text-3xl font-extrabold text-center text-gray-100">
        {isLogin ? 'Bem-vindo(a) Login' : 'Crie Sua Conta'}
      </h1>
      <p className="mb-8 text-sm text-center text-gray-400">
        {isLogin ? 'Entre para acessar sua área.' : 'Cadastre-se para começar.'}
      </p>

      {message?.text && (
        <div
          className={`p-3 mb-6 rounded-xl border transition-all duration-300 ${messageClasses}`}
          role="alert"
        >
          <p className="text-sm">{message.text}</p>
        </div>
      )}

      <form action={isLogin ? loginAction : signupAction}>
        {!isLogin && (
          <div className="mb-5">
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
                placeholder="Seu Nome Completo"
                required={!isLogin}
                className="w-full py-3 pl-12 pr-4 text-gray-100 placeholder-gray-500 transition duration-150 bg-gray-800 border border-gray-600 rounded-xl focus:ring-blue-400 focus:border-blue-400 disabled:opacity-50"
              />
            </div>
          </div>
        )}

        <div className="mb-5">
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
              className="w-full py-3 pl-12 pr-4 text-gray-100 placeholder-gray-500 transition duration-150 bg-gray-800 border border-gray-600 rounded-xl focus:ring-blue-400 focus:border-blue-400 disabled:opacity-50"
            />
          </div>
        </div>

        <div className="mb-6">
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
              placeholder="Sua Senha"
              required
              className="w-full py-3 pl-12 pr-4 text-gray-100 placeholder-gray-500 transition duration-150 bg-gray-800 border border-gray-600 rounded-xl focus:ring-blue-400 focus:border-blue-400 disabled:opacity-50"
            />
          </div>
        </div>

        <SubmitButton isLogin={isLogin} />
      </form>

      <p className="mt-6 text-sm text-center text-gray-400">
        {isLogin ? 'Novo por aqui?' : 'Já tem uma conta?'}
        <button
          onClick={toggleMode}
          className="ml-2 font-semibold text-blue-400 transition duration-150 hover:text-blue-300 focus:outline-none"
        >
          {isLogin ? 'Crie Sua Conta' : 'Fazer Login'}
        </button>
      </p>
    </div>
  )
}

export default LoginComponent