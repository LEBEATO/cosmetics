import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { prisma } from '../../lib/prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'dev'

export async function POST(req: Request){
  try{
    const auth = req.headers.get('authorization') || ''
    const token = auth.replace('Bearer ', '')
    const body = await req.json()
    const cosmeticId = Number(body.cosmeticId)
    if(!token) return NextResponse.json({ ok:false, message: 'no token' }, { status:401 })
    const payload: any = jwt.verify(token, JWT_SECRET)
    const user = await prisma.user.findUnique({ where: { id: payload.sub } })
    if(!user) return NextResponse.json({ ok:false, message: 'user not found' }, { status:404 })

    const cosmetic = await prisma.cosmetic.findUnique({ where: { id: cosmeticId } })
    if(!cosmetic) return NextResponse.json({ ok:false, message: 'cosmetic not found' }, { status:404 })

    // já comprado?
    const already = await prisma.purchase.findFirst({ where: { userId: user.id, cosmeticId: cosmetic.id, refunded: false } })
    if(already) return NextResponse.json({ ok:false, message: 'já comprado' }, { status:400 })

    if(user.credits < cosmetic.price) return NextResponse.json({ ok:false, message: 'créditos insuficientes' }, { status:400 })

    // débito
    await prisma.user.update({ where: { id: user.id }, data: { credits: { decrement: cosmetic.price } } })
    const p = await prisma.purchase.create({ data: { userId: user.id, cosmeticId: cosmetic.id, price: cosmetic.price } })

    return NextResponse.json({ ok:true, purchase: p })
  }catch(e:any){
    return NextResponse.json({ ok:false, message: e.message }, { status:500 })
  }
}