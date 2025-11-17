'use server'

import { redirect } from 'next/navigation'

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

  // TODO: Implementar cadastro sem banco de dados
  return {
    type: 'error',
    message: 'Funcionalidade de cadastro não disponível sem banco de dados.',
  }
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

  // TODO: Implementar login sem banco de dados
  return {
    type: 'error',
    message: 'Funcionalidade de login não disponível sem banco de dados.',
  }
}

export async function logout() {
  // TODO: Implementar logout sem banco de dados
  redirect('/login')
}

export async function getUsers() {
  // TODO: Implementar busca de usuários sem banco de dados
  return []
}

export async function getCosmetics() {
  // TODO: Implementar busca de cosméticos sem banco de dados
  return []
}

export async function getMyCosmetics() {
  // TODO: Implementar busca de cosméticos do usuário sem banco de dados
  return []
}

