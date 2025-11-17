import CosmeticCard from '@/components/CosmeticCard'
import Pagination from '@/components/Pagination'
import SyncButton from '@/components/SyncButton'
import { getAllCosmetics, transformCosmeticData } from '@/app/lib/fortnite'
import { type CosmeticType } from '@/types/Cosmetic'

const COSMETICS_PER_PAGE = 12

async function getCosmetics(page: number, searchTerm?: string) {
  try {
    // Buscar cosméticos da API do Fortnite
    const response = await getAllCosmetics()
    const cosmeticsData = Array.isArray(response?.data) ? response.data : []
    
    // Transformar dados da API para o formato do nosso tipo
    let allCosmetics: CosmeticType[] = cosmeticsData.map(transformCosmeticData)
    
    // Filtrar por termo de busca se fornecido
    if (searchTerm && searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase().trim()
      allCosmetics = allCosmetics.filter((cosmetic) => {
        const name = (cosmetic.name || '').toLowerCase()
        const description = (cosmetic.description || '').toLowerCase()
        const rarity = (cosmetic.rarity || '').toLowerCase()
        const type = (cosmetic.type || '').toLowerCase()
        
        return (
          name.includes(searchLower) ||
          description.includes(searchLower) ||
          rarity.includes(searchLower) ||
          type.includes(searchLower)
        )
      })
    }
    
    // Calcular paginação
    const totalCosmetics = allCosmetics.length
    const totalPages = Math.ceil(totalCosmetics / COSMETICS_PER_PAGE)
    const startIndex = (page - 1) * COSMETICS_PER_PAGE
    const endIndex = startIndex + COSMETICS_PER_PAGE
    const paginatedCosmetics = allCosmetics.slice(startIndex, endIndex)

    return { 
      cosmetics: paginatedCosmetics, 
      totalPages,
      totalResults: totalCosmetics
    }
  } catch (error) {
    console.error('Erro ao buscar cosméticos:', error)
    // Retornar array vazio em caso de erro
    return { 
      cosmetics: [], 
      totalPages: 0,
      totalResults: 0
    }
  }
}

export default async function Loja({ searchParams }: { searchParams: Promise<{ page?: string; search?: string }> }) {
  const resolvedSearchParams = await searchParams
  const currentPage = Number(resolvedSearchParams.page) || 1
  const searchTerm = resolvedSearchParams.search || ''
  const { cosmetics, totalPages, totalResults } = await getCosmetics(currentPage, searchTerm)

  return (
    <div className="max-w-6xl px-6 py-12 mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Cosméticos
          </h1>
          {searchTerm && (
            <p className="mt-2 text-sm text-gray-400">
              {totalResults > 0 
                ? `Encontrados ${totalResults} resultado${totalResults !== 1 ? 's' : ''} para "${searchTerm}"`
                : `Nenhum resultado encontrado para "${searchTerm}"`}
            </p>
          )}
        </div>
        <SyncButton />
      </div>

      {cosmetics.length === 0 ? (
        <div className="text-center py-12">
          {searchTerm ? (
            <>
              <p className="text-gray-400 mb-4">
                Nenhum cosmético encontrado para "{searchTerm}".
              </p>
              <p className="text-sm text-gray-500">
                Tente buscar por nome, descrição, raridade ou tipo de cosmético.
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-400 mb-4">
                Nenhum cosmético disponível.
              </p>
              <p className="text-sm text-gray-500">
                {process.env.FORTNITE_API_KEY === 'your_fortnite_api_key_here' || !process.env.FORTNITE_API_KEY
                  ? 'Configure a FORTNITE_API_KEY no arquivo .env para carregar cosméticos.'
                  : 'Use o botão de sincronização para carregar cosméticos da API ou verifique sua conexão.'}
              </p>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cosmetics.map((item) => (
              <CosmeticCard key={item.id} cosmetic={item} />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination page={currentPage} total={totalPages} />
          )}
        </>
      )}
    </div>
  );
}
