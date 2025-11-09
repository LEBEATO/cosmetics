import { NextResponse } from 'next/server'
import { prisma } from './../../lib/prisma'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const page = Math.max(1, Number(url.searchParams.get('page') ?? 1))
    const perPage = Math.min(50, Math.max(1, Number(url.searchParams.get('perPage') ?? 12)))
    const q = url.searchParams.get('q') || undefined
    const type = url.searchParams.get('type') || undefined
    const rarity = url.searchParams.get('rarity') || undefined
    const onlyNew = url.searchParams.get('new') === '1'
    const onlyShop = url.searchParams.get('shop') === '1'

    const where: any = {}
    if(q) where.name = { contains: q, mode: 'insensitive' }
    if(type) where.type = type
    if(rarity) where.rarity = rarity
    if(onlyNew) where.isNew = true
    if(onlyShop) where.available = true

    const [total, list] = await Promise.all([
      prisma.cosmetic.count({ where }),
      prisma.cosmetic.findMany({ 
        where, 
        skip: (page-1)*perPage, 
        take: perPage,
        orderBy: { name: 'asc' }
      })
    ])

    return NextResponse.json({ 
      total, 
      data: list,
      page,
      perPage,
      totalPages: Math.ceil(total/perPage)
    })
  } catch(e: any) {
    return NextResponse.json(
      { error: e.message }, 
      { status: 500 }
    )
  }
}