import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { prisma } from '@/app/lib/prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'dev'

export async function GET(req: Request){
  const auth = req.headers.get('authorization') || ''
  const token = auth.replace('Bearer ', '')

  if(!token) {
    return NextResponse.json({ ok:false, message: 'Token ausente' }, { status:401 })
  }

  try {
    const payload: any = jwt.verify(token, JWT_SECRET)
    const user = await prisma.user.findUnique({ where: { id: payload.sub } })
    return NextResponse.json({
      ok:true,
      user: { id:user?.id, email:user?.email, credits:user?.credits }
    })
  } catch(e:any) {
    return NextResponse.json({ ok:false, message: e.message }, { status:401 })
  }
}