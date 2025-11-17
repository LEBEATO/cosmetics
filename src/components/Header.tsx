'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Auth from '@/components/Auth'
import { Search, Store, Gem, Menu, X, Figma, Receipt, Users } from 'lucide-react'
export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Preencher campo de busca se houver termo na URL
  useEffect(() => {
    const urlSearch = searchParams.get('search')
    if (urlSearch) {
      setSearchTerm(urlSearch)
      // Abrir campo de busca se estiver na página da loja
      if (pathname === '/' || pathname === '/loja') {
        setIsSearchOpen(true)
      }
    }
  }, [searchParams, pathname])

  const userPoints = 10000

  const navLinks = [
    { name: 'Loja', href: '/', icon: Store },
    { name: 'Comunidade', href: '/community', icon: Users },
    {
      name: 'Cosméticos Adquiridos',
      href: '/my-cosmetics',
      icon: Figma,
    },
    { name: 'Histórico', href: '/history', icon: Receipt },
  ]

  const linkClass =
    'custom-font text-gray-300 hover:text-fuchsia-400 transition duration-200 hover:drop-shadow-[0_0_5px_rgba(236,72,153,0.8)] focus:outline-none focus:ring-2 focus:ring-fuchsia-500 rounded-md py-1 px-2 text-sm font-medium'

  const handleSearchToggle = () => {
    setIsSearchOpen((prev) => !prev)
    if (!isSearchOpen && isMenuOpen) {
      setIsMenuOpen(false)
    }
  }

  const handleSearchSubmit = () => {
    const term = searchTerm.trim()
    if (term === '') {
      // Se estiver na página principal, limpa a busca
      if (pathname === '/' || pathname === '/loja') {
        router.push('/')
        setIsSearchOpen(false)
      }
      return
    }
    
    // Redireciona para a página principal com o termo de busca
    const basePath = pathname === '/loja' ? '/loja' : '/'
    router.push(`${basePath}?search=${encodeURIComponent(term)}`)
    setIsSearchOpen(false)
  }

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300 border-b bg-gray-950/70 backdrop-blur-md border-fuchsia-400/50 shadow-neon-blue-inner"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Seção Esquerda: Logo e Nome da Loja */}
          <div className="flex items-center">
            {/* Logo e Nome */}
            <Link
              href="/"
              className="flex items-center space-x-2 cursor-pointer sm:space-x-3"
            >
              <div className="p-2 text-white bg-blue-600 rounded-full shadow-lg shadow-blue-500/70 hover:shadow-blue-400/90">
                <Store
                  className="w-5 h-5 sm:h-6 sm:w-6"
                  aria-label="Logo da Fortinat-shop"
                />
              </div>
              <h1
                className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text 
                             bg-gradient-to-r from-blue-400 via-fuchsia-400 to-red-400 
                             tracking-wider whitespace-nowrap drop-shadow-[0_0_5px_rgba(236,72,153,0.8)]"
              >
                <span className="text-blue-400 drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]">
                  Fortinat
                </span>
                -shop
              </h1>
            </Link>

            {/* Menu de Navegação - VISÍVEL APENAS NO DESKTOP (Web) */}
            <nav className="hidden ml-48 space-x-4 sm:flex">
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`${linkClass} flex items-center space-x-2`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Seção Direita: Menu Hambúrguer (Mobile) + Busca, Pontos e Login */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Botão Hambúrguer - VISÍVEL APENAS NO MOBILE */}
            <button
              aria-label="Abrir Menu"
              className="p-2 transition duration-200 rounded-full text-fuchsia-300 sm:hidden hover:bg-fuchsia-600/30 hover:shadow-xl hover:shadow-fuchsia-500/80"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen)
                setIsSearchOpen(false)
              }} // Fecha busca ao abrir menu
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Botão de Busca (Lupa) */}
            <button
              aria-label={isSearchOpen ? 'Fechar busca' : 'Abrir busca'}
              className={`p-2 sm:p-3 transition duration-200 
                         rounded-full hover:bg-fuchsia-600/30 
                         focus:outline-none focus:ring-2 focus:ring-fuchsia-500 
                         hover:shadow-xl hover:shadow-fuchsia-500/80 
                         ${
                           isSearchOpen
                             ? 'text-white bg-fuchsia-700/50'
                             : 'text-fuchsia-300'
                         }`}
              onClick={handleSearchToggle}
            >
              <Search className="w-5 h-5 sm:h-6 sm:w-6" />
            </button>

            {/* Seção: Pontos do Usuário - VISÍVEL APENAS NO DESKTOP */}
            <div
              className="hidden sm:flex items-center bg-gray-700/50 rounded-full py-1.5 px-3 
                            border border-fuchsia-500/50 shadow-md shadow-fuchsia-500/30 
                            space-x-2 transition-all duration-300 cursor-pointer hover:bg-gray-600/60"
              onClick={() => console.log('Ação: Visualizar carteira de pontos')}
            >
              <Gem className="h-5 w-5 text-fuchsia-300 drop-shadow-[0_0_2px_rgba(236,72,153,0.9)]" />
              <span
                className="text-base font-bold text-white 
                                 drop-shadow-[0_0_3px_rgba(236,72,153,0.5)]"
              >
                {userPoints.toLocaleString('pt-BR')}
              </span>
            </div>

            {/* Botão Entrar */}
            <Auth />
          </div>
        </div>
      </div>

      {/* NOVO: Barra de Busca Deslizante */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden 
                    ${
                      isSearchOpen ? 'max-h-20 opacity-100 py-3' : 'max-h-0 opacity-0'
                    }`}
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Digite para buscar cosméticos, usuários..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearchSubmit()
              }}
              className="w-full p-3 text-white transition duration-200 bg-gray-800 border rounded-lg border-fuchsia-400/50 focus:ring-2 focus:ring-blue-400 shadow-inner-neon focus:outline-none"
            />
            {/* Botão de Busca (Lupa) para executar a pesquisa */}
            <button
              aria-label="Executar busca"
              className="p-3 transition duration-200 rounded-lg text-fuchsia-300 hover:text-white bg-fuchsia-600/30 hover:bg-fuchsia-600/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              onClick={handleSearchSubmit}
            >
              <Search className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile Deslizante (Dropdown) */}
      <div
        className={`sm:hidden transition-all duration-300 ease-in-out overflow-hidden
                    ${isMenuOpen ? 'max-h-96 opacity-100 py-2' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1 border-t shadow-inner bg-gray-900/90 border-fuchsia-500/30 shadow-fuchsia-500/50">
          {navLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium 
                           text-fuchsia-300 hover:bg-gray-700/50 hover:text-white 
                           transition duration-150 drop-shadow-[0_0_2px_rgba(236,72,153,0.5)]"
                onClick={() => setIsMenuOpen(false)}
              >
                {Icon && <Icon className="w-5 h-5" />}
                <span>{link.name}</span>
              </Link>
            )
          })}

          {/* Seção: Pontos do Usuário - VISÍVEL APENAS NO MOBILE */}
          <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-700">
            <div className="flex items-center space-x-2">
              <Gem className="h-5 w-5 text-fuchsia-300 drop-shadow-[0_0_2px_rgba(236,72,153,0.9)]" />
              <span className="text-base font-bold text-white drop-shadow-[0_0_3px_rgba(236,72,153,0.5)]">
                {userPoints.toLocaleString('pt-BR')} Pontos
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}