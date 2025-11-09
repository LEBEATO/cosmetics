import CosmeticCard from '@/components/CosmeticCard'
import Pagination from '@/components/Pagination'
import SyncButton from '@/components/SyncButton'
import { prisma } from '@/app/lib/prisma'

const COSMETICS_PER_PAGE = 12

async function getCosmetics(page: number) {
  const totalCosmetics = await prisma.cosmetic.count()
  const totalPages = Math.ceil(totalCosmetics / COSMETICS_PER_PAGE)

  const cosmetics = await prisma.cosmetic.findMany({
    take: COSMETICS_PER_PAGE,
    skip: (page - 1) * COSMETICS_PER_PAGE,
    orderBy: {
      name: 'asc',
    },
  })

  return { cosmetics, totalPages }
}

export default async function Loja({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = Number(searchParams.page) || 1
  const { cosmetics, totalPages } = await getCosmetics(currentPage)

  return (
    <div className="max-w-6xl px-6 py-12 mx-auto">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold tracking-wide">Cosméticos</h1>
        <SyncButton />
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {cosmetics.map((item) => (
          <CosmeticCard key={item.id} cosmetic={item} />
        ))}
      </div>
      <Pagination page={currentPage} total={totalPages} />
    </div>
  );
}