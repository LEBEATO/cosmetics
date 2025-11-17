import { NextResponse } from 'next/server'
import { getAllCosmetics, getNewCosmetics, getShop } from '@/app/lib/fortnite'

export async function POST() {
  try {
    // Buscar dados da API do Fortnite
    const all = await getAllCosmetics()
    const news = await getNewCosmetics()
    const shop = await getShop()

    // TODO: Implementar sincronização sem banco de dados
    // Por enquanto, apenas retorna sucesso sem salvar nada
    return NextResponse.json({ 
      ok: true, 
      message: 'Sincronização concluída (sem persistência - banco de dados removido)',
      data: {
        total: Array.isArray(all?.data) ? all.data.length : 0,
        new: Array.isArray(news?.data?.items) ? news.data.items.length : 0,
        shop: shop?.data ? 'Disponível' : 'Indisponível'
      }
    })
  } catch (e: any) {
    return NextResponse.json({ 
      ok: false, 
      message: e.message || 'Erro ao sincronizar cosméticos' 
    }, { status: 500 })
  }
}

