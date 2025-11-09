'use server'

import { prisma } from '@/app/lib/prisma'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation';
import { signIn, signOut, auth } from '@/auth'

export async function signup(
  prevState: { type?: string; message: string } | undefined,
  formData: FormData,
) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!name) {
    return {
      field: 'name',
      type: 'error',
      message: 'O nome é obrigatório.',
    }
  }

  if (!email || !password) {
    return { type: 'error', message: 'E-mail e senha são obrigatórios.' }
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return {
      field: 'email',
      type: 'error',
      message: 'Este e-mail já está em uso.',
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      credits: 10000,
    },
  })

  // Redireciona para a página de login após o cadastro bem-sucedido
  redirect('/login?registered=true')
}

export async function login(
  prevState: { type?: string; message: string } | undefined,
  formData: FormData,
) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return {
      type: 'error',
      message: 'Por favor, preencha todos os campos.',
    }
  }

  try {
    // A função signIn do NextAuth.js/Auth.js lida com a verificação.
    const result = await signIn('credentials', { email, password, redirect: false })
  } catch (error) {
    // O NextAuth.js/Auth.js lança um erro com type 'CredentialsSignin'
    if (
      error &&
      typeof error === 'object' &&
      'type' in error &&
      error.type === 'CredentialsSignin'
    ) {
      return { type: 'error', message: 'Credenciais inválidas. Tente novamente.' }
    }
    // Lança outros erros para depuração
    throw error
  }

  redirect('/')
}

export async function logout() {
  await signOut()
}

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return users
  } catch (error) {
    return []
  }
}

export async function getCosmetics() {
  try {
    const cosmetics = await prisma.cosmetic.findMany({
      where: { available: true },
      orderBy: { name: 'asc' },
      select: {
        id: true,
        externalId: true, // Adicionado
        name: true,
        description: true,
        image: true,
        price: true,
        rarity: true,
        type: true,
        isNew: true,
        available: true,
        createdAt: true, // Adicionado
      },
    })
    return cosmetics
  } catch (error) {
    console.error('Failed to fetch cosmetics:', error)
    return []
  }
}

export async function getMyCosmetics() {
  const session = await auth()
  if (!session?.user?.id) {
    return []
  }

  try {
    const userPurchases = await prisma.purchase.findMany({
      where: {
        userId: parseInt(session.user.id, 10),
        refunded: false,
      },
      include: {
        cosmetic: true,
      },
    })

    // Extrai apenas os cosméticos das compras
    const ownedCosmetics = userPurchases.map((purchase) => purchase.cosmetic)

    return ownedCosmetics
  } catch (error) {
    console.error('Failed to fetch user cosmetics:', error)
    return []
  }
}