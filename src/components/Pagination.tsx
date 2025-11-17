'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export default function Pagination({ page, total }: { page: number; total: number }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const basePath = pathname === '/loja' ? '/loja' : '/'
  
  // Preservar parâmetro de busca se existir
  const search = searchParams.get('search')
  const searchQuery = search ? `&search=${encodeURIComponent(search)}` : ''

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      {page > 1 ? (
        <Link 
          href={`${basePath}?page=${page - 1}${searchQuery}`}
          className="px-4 py-2 text-sm font-semibold text-white bg-gray-700 rounded-md hover:bg-gray-600 transition-colors duration-200"
        >
          ← Anterior
        </Link>
      ) : (
        <span className="px-4 py-2 text-sm font-semibold text-gray-500 bg-gray-800 rounded-md cursor-not-allowed">
          ← Anterior
        </span>
      )}
      
      <span className="px-4 py-2 text-sm font-medium text-gray-300">
        Página {page} de {total}
      </span>

      {page < total ? (
        <Link 
          href={`${basePath}?page=${page + 1}${searchQuery}`}
          className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-md hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Próxima →
        </Link>
      ) : (
        <span className="px-4 py-2 text-sm font-semibold text-gray-500 bg-gray-800 rounded-md cursor-not-allowed">
          Próxima →
        </span>
      )}
    </div>
  )
}
