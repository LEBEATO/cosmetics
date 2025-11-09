import { NextResponse } from 'next/server'
import { prisma } from './../../../lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'dev'

export async function POST(req: Request){
  const { email, password } = await req.json()
  if(!email || !password) {
    return NextResponse.json({ ok: false, message: 'Dados inválidos' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if(!user) {
    return NextResponse.json({ ok:false, message: 'Credenciais inválidas' }, { status: 401 })
  }

  const ok = await bcrypt.compare(password, user.password)
  if(!ok) {
    return NextResponse.json({ ok:false, message: 'Credenciais inválidas' }, { status:401 })
  }

  const token = jwt.sign(
    { sub: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  )

  return NextResponse.json({
    ok:true,
    token,
    user: { id: user.id, email: user.email, credits: user.credits }
  })
}