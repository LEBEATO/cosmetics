import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(req: Request, { params }: any){
  const id = Number(params.id)
  const purchases = await prisma.purchase.findMany({ where: { userId: id, refunded: false }, include: { cosmetic: true } })
  const data = purchases.map(p => ({ id: p.cosmetic.id, name: p.cosmetic.name, image: p.cosmetic.image }))
  return NextResponse.json({ data })
}