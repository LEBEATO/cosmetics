# 📝 Instruções de Setup

## ⚠️ Importante: Banco de Dados Removido

Este projeto **não utiliza banco de dados** (Prisma foi removido). Funcionalidades que dependem de persistência de dados precisam ser implementadas com uma solução alternativa.

## O que você precisa fazer:

### 1. Criar arquivo `.env`

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

### 2. Instalar dependências

```bash
npm install
# ou
yarn install
```

### 3. Iniciar o projeto

```bash
npm run dev
```

## Variáveis de Ambiente Necessárias:

- **FORTNITE_API_KEY**: Chave da API do Fortnite (obtenha em https://fortnite-api.com/)
- **JWT_SECRET**: Chave secreta para JWT (use uma string aleatória em produção)
- **AUTH_SECRET**: Chave secreta para NextAuth (use uma string aleatória em produção)
- **NEXTAUTH_URL**: URL base da aplicação (http://localhost:3000 para desenvolvimento)

## ⚠️ Funcionalidades Afetadas:

As seguintes funcionalidades retornam erro 501 (Not Implemented) ou dados vazios, pois dependiam do banco de dados:

- Autenticação de usuários (login/signup)
- Busca de usuários
- Compra de cosméticos
- Reembolso de cosméticos
- Listagem de cosméticos do usuário
- Sincronização de cosméticos (não persiste dados)
- Listagem de cosméticos na loja

## 🔧 Próximos Passos:

Para restaurar a funcionalidade, você precisará:

1. Escolher uma solução de persistência (ex: banco de dados, API externa, arquivos JSON, etc.)
2. Implementar as funções marcadas com `TODO` nos arquivos de código
3. Atualizar os arquivos de API para usar a nova solução de persistência

## ⚠️ Importante:

- O arquivo `.env` não deve ser commitado no git (já está no .gitignore)
- Em produção, use chaves seguras geradas com: `openssl rand -base64 32`
- Obtenha sua chave da API do Fortnite em: https://fortnite-api.com/
