import { getCosmetics } from '@/app/actions'
import CosmeticCard from '@/components/CosmeticCard'
import { auth } from '@/auth'
import { type CosmeticType } from '@/types/Cosmetic'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function MyCosmeticsPage(): Promise<JSX.Element> {
  // valida sessão
  const session = await auth()
  if (!session?.user?.id) {
    // redirect lança uma exceção que o Next entende — não precisa "return"
    redirect('/login?callbackUrl=/my-cosmetics')
  }

  // buscar cosméticos com try/catch para evitar crash se a API falhar
  let cosmetics: CosmeticType[] = []
  try {
    const res = await getCosmetics()
    // normalizar: se getCosmetics devolver null/undefined, transformar em array vazio
    cosmetics = Array.isArray(res) ? res : []
  } catch (err) {
    // você pode trocar por um logger real ou console.error
    console.error('Erro ao carregar cosméticos:', err)
    cosmetics = []
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400">
        Meus Cosméticos
      </h1>

      {cosmetics.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {cosmetics.map((cosmetic: CosmeticType) => (
            <CosmeticCard key={cosmetic.id} cosmetic={cosmetic} owned={true} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-900 border-2 border-dashed rounded-lg border-gray-700">
          <p className="text-lg text-gray-400">Você ainda não possui nenhum cosmético.</p>
          <Link
            href="/"
            className="mt-4 px-4 py-2 font-semibold text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Ir para a Loja
          </Link>
        </div>
      )}
    </div>
  )
}