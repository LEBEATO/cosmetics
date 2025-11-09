import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { getAllCosmetics, getNewCosmetics, getShop } from '../../../lib/fortnite'
import { Cosmetic } from '@prisma/client'

type CosmeticData = Omit<Cosmetic, 'id' | 'isBundle' | 'bundleId'> & {
  id: string
  isBundle?: boolean
  bundleId?: string | null
}

export async function POST() {
  try {
    // 1. BUSCAR TODOS OS COSMÉTICOS DA API
    const all = await getAllCosmetics()
    const cosmeticsFromApi = Array.isArray(all?.data) ? all.data : []

    // 2. PREPARAR E SALVAR DADOS EM LOTE (UPSERT)
    // Isso é muito mais eficiente do que fazer um `upsert` por item em um loop.
    const upsertPromises = cosmeticsFromApi.map((item: any) => {
      const cosmeticData: CosmeticData = {
        id: item.id,
        name: item.name || 'Sem nome',
        description: item.description || null,
        image: item.images?.icon ?? item.images?.featured ?? null,
        price: item.price ?? 0,
        rarity: item.rarity?.value || null,
        type: item.type?.value || null,
        isNew: false, // Será atualizado abaixo
        available: false, // Será atualizado abaixo
      }
      return prisma.cosmetic.upsert({
        where: { id: item.id },
        update: cosmeticData,
        create: cosmeticData,
      })
    })
    await prisma.$transaction(upsertPromises)

    // 3. ATUALIZAR COSMÉTICOS NOVOS
    const news = await getNewCosmetics()
    const newIds = Array.isArray(news?.data?.items)
      ? news.data.items.map((item: any) => item.id)
      : []

    await prisma.$transaction([
      // Reseta todos para `isNew: false`
      prisma.cosmetic.updateMany({ data: { isNew: false } }),
      // Define `isNew: true` apenas para os que estão na lista de novos
      prisma.cosmetic.updateMany({
        where: { id: { in: newIds } },
        data: { isNew: true },
      }),
    ])

    // 4. ATUALIZAR COSMÉTICOS À VENDA (LOJA)
    const shop = await getShop()
    // A API da loja tem seções como 'featured', 'daily', etc.
    const shopSections = shop?.data ? Object.values(shop.data).filter((section: any) => section && Array.isArray(section.entries)) : [];
    const allShopEntries = shopSections.flatMap((section: any) => section.entries);

    const shopItemsToUpdate: { id: string; price: number }[] = []
    allShopEntries.forEach((entry: any) => {
      // Se a entrada for um bundle, o preço se aplica a todos os itens dentro dele
      const price = entry.finalPrice ?? entry.regularPrice ?? 0
      entry.items.forEach((item: any) => {
        shopItemsToUpdate.push({ id: item.id, price })
      })
    })

    const shopItemIds = shopItemsToUpdate.map(item => item.id)

    await prisma.$transaction([
      // Reseta todos para `available: false`
      prisma.cosmetic.updateMany({ data: { available: false } }),
      // Atualiza cada item da loja com `available: true` e o preço correto
      ...shopItemsToUpdate.map(({ id, price }) =>
        prisma.cosmetic.update({
          where: { id },
          data: { available: true, price },
        }),
      ),
    ])

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ ok: false, message: e.message }, { status: 500 })
  }
}