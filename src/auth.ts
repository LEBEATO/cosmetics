import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const {
  handlers,
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

        // TODO: Implementar autenticação sem banco de dados
        // Por enquanto, retorna null (usuário não encontrado)
        return null
      },
    }),
  ],
})

