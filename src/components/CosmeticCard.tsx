'use client'
import Link from 'next/link'
import { useState } from 'react'
import { type CosmeticType } from '@/types/Cosmetic'

type Props = {
  cosmetic: CosmeticType,
  owned?: boolean
}

export default function CosmeticCard({ cosmetic, owned=false }: Props){
  const [loading, setLoading] = useState(false)
  return ( 
    <div className="overflow-hidden transition-transform duration-300 bg-gray-900 border border-gray-700 rounded-lg shadow-lg card-neon hover:scale-105">
      <div className="relative overflow-hidden w-full">
        {cosmetic.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={cosmetic.image} 
            alt={cosmetic.name} 
            className="cosmetic-img"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex items-center justify-center cosmetic-img bg-zinc-900">No Image</div>
        )}
        <div className="absolute flex flex-wrap gap-2 top-2 left-2">
          {cosmetic.isNew && <span className="px-2 py-1 text-xs font-bold text-white rounded bg-gradient-to-r from-blue-500 to-cyan-500">NOVO</span>}
          {owned && <span className="px-2 py-1 text-xs font-bold text-white rounded bg-emerald-600">ADQUIRIDO</span>}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold truncate text-zinc-100">{cosmetic.name}</h3>
        <p className="h-10 overflow-hidden text-sm text-zinc-400 text-ellipsis">{cosmetic.description || 'Sem descrição.'}</p>
        <p className="mt-2 text-xs truncate text-zinc-500">{cosmetic.rarity} • {cosmetic.type}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="text-sm font-bold text-yellow-400">{`${cosmetic.price.toLocaleString('pt-BR')} v-bucks`}</div>
          <button 
            className="px-3 py-1 text-sm font-semibold text-white transition-colors bg-blue-600 rounded-md btn-neon hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed" 
            disabled={owned || loading || !cosmetic.available || cosmetic.price === 0}
          >
            {owned ? 'Comprado' : 'Comprar'}
          </button>
        </div>
      </div>
    </div>
  )
}