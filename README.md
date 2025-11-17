This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 Setup e Instalação

### 1. Instalar Dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
# Fortnite API
# Obtenha sua chave em: https://fortnite-api.com/
FORTNITE_API_KEY=your_fortnite_api_key_here

# JWT Secret (use uma string aleatória segura em produção)
JWT_SECRET=dev_secret_key_change_in_production

# NextAuth
AUTH_SECRET=dev_auth_secret_change_in_production
NEXTAUTH_URL=http://localhost:3000
```

**Importante:**
- Obtenha uma chave da API do Fortnite em [fortnite-api.com](https://fortnite-api.com/)
- Em produção, gere chaves seguras para `JWT_SECRET` e `AUTH_SECRET` usando: `openssl rand -base64 32`
- ⚠️ **Nota:** Este projeto não utiliza banco de dados. Funcionalidades que dependem de persistência de dados precisam ser implementadas.

### 3. Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado.

## 📋 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run start` - Inicia o servidor de produção

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
