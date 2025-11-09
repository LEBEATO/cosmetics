import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from '@/app/lib/prisma'
import bcrypt from 'bcryptjs'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
          select: { id: true, name: true, email: true, password: true },
        })

        if (!user) {
          return null
        }

        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          user.password,
        )

        if (passwordsMatch) {
          // Retorna o objeto do usuário para a sessão
          return { id: String(user.id), name: user.name, email: user.email }
        }

        return null
      },
    }),
  ],
})