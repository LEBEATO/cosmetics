'use client'

import { RefreshCw } from 'lucide-react'

export default function SyncButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
      <RefreshCw size={16} /> Sincronizar
    </button>
  )
}