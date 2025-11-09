'use client'

import Link from 'next/link'

export default function Pagination({ page, total }: { page: number; total: number }) {
  return (
    <div className="flex justify-center gap-4 mt-8">
      {page > 1 && <Link href={`/loja?page=${page - 1}`}>Anterior</Link>}
      {page < total && <Link href={`/loja?page=${page + 1}`}>Próxima</Link>}
    </div>
  )
}