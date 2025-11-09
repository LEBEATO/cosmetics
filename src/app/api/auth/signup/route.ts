import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import bcrypt from 'bcrypt'

export async function POST(req: Request){
  const body = await req.json()
  const { email, password } = body
  if(!email || !password) return NextResponse.json({ ok:false, message: 'email e password são obrigatórios'}, { status:400 })

  const exists = await prisma.user.findUnique({ where: { email } })
  if(exists) return NextResponse.json({ ok:false, message: 'email já cadastrado' }, { status:400 })

  const hash = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({ data: { email, password: hash, credits: 10000 } })

  return NextResponse.json({ ok:true, user: { id: user.id, email: user.email, credits: user.credits } })
}