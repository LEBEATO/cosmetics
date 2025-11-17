'use client'

import { RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SyncButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSync = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/cosmetics/sync', {
        method: 'POST',
      })
      const data = await response.json()
      
      if (data.ok) {
        // Recarregar a página para mostrar os novos dados
        router.refresh()
      } else {
        alert('Erro ao sincronizar: ' + (data.message || 'Erro desconhecido'))
      }
    } catch (error) {
      console.error('Erro ao sincronizar:', error)
      alert('Erro ao sincronizar cosméticos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button 
      onClick={handleSync}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-md hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
    >
      <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> 
      {loading ? 'Sincronizando...' : 'Sincronizar'}
    </button>
  )
}
