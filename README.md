# 🛒 Shopwork - E-commerce Microservices Framework

> Uma plataforma completa de e-commerce construída com arquitetura de microserviços usando NestJS, Prisma ORM e SQLite.

## 📋 Índice

- [Arquitetura](#-arquitetura)
- [Início Rápido](#-início-rápido)
- [Configuração do Banco de Dados](#-configuração-do-banco-de-dados)
- [Executando o Projeto](#-executando-o-projeto)
- [Testando a API](#-testando-a-api)
- [Endpoints Disponíveis](#-endpoints-disponíveis)
- [Gerenciamento do Banco](#-gerenciamento-do-banco-de-dados)
- [Resolução de Problemas](#-resolução-de-problemas)

---

## 🏗️ Arquitetura

Shopwork utiliza uma **arquitetura de microserviços** com 10 serviços independentes:

| Serviço | Porta | Descrição |
|---------|-------|-----------|
| **API Gateway** | 3000 | Ponto de entrada central para todas as requisições |
| **User Service** | 3001 | Gerenciamento de usuários e autenticação |
| **Product Service** | 3002 | CRUD de produtos |
| **Catalog Service** | 3003 | Busca e descoberta de produtos |
| **Cart Service** | 3004 | Gerenciamento de carrinho de compras |
| **Order Service** | 3005 | Processamento de pedidos |
| **Payment Service** | 3006 | Processamento de pagamentos |
| **Shipping Service** | 3007 | Logística e envio |
| **Mail Service** | 3008 | Notificações por e-mail |
| **Review Service** | 3009 | Avaliações de produtos |

**Stack Tecnológica:**
- 🚀 **NestJS** - Framework Node.js
- 🗄️ **Prisma ORM** - Object-Relational Mapping
- 📦 **SQLite** - Banco de dados (desenvolvimento)
- 🔄 **Axios** - Comunicação HTTP entre serviços
- ⚡ **Concurrently** - Execução paralela de processos

---

## 🚀 Início Rápido

### 1️⃣ Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior) - [Download](https://nodejs.org/)
- **npm** (vem com Node.js)
- **Git** (opcional) - [Download](https://git-scm.com/)

### 2️⃣ Instalação

```bash
# Clone o repositório (se ainda não tiver)
git clone https://github.com/Ashlc/shopwork.git
cd shopwork

# Instale todas as dependências
npm install
```

---

## 🗄️ Configuração do Banco de Dados

### 1. Criar arquivo `.env`

Crie um arquivo `.env` na raiz do projeto:

```env
# Database Configuration
DATABASE_URL="file:./dev.db"
```

### 2. Configurar Prisma

Execute os comandos na ordem:

```bash
# 1. Gerar o Prisma Client
npm run prisma:generate

# 2. Criar o banco de dados e aplicar migrations
npm run prisma:migrate

# 3. Popular o banco com dados de exemplo
npm run db:seed
```

**O que cada comando faz:**

- `prisma:generate` → Gera o cliente Prisma baseado no schema
- `prisma:migrate` → Cria o arquivo `dev.db` e aplica as migrations
- `db:seed` → Adiciona dados de exemplo (usuários, produtos, etc.)

### 3. Verificar o Banco de Dados

Abra o Prisma Studio para visualizar os dados:

```bash
npm run prisma:studio
```

Acesse: `http://localhost:5555`

**Dados criados pelo seed:**
- ✅ 2 usuários (João Silva, Maria Santos)
- ✅ 5 produtos (Smartphone, Notebook, Camiseta, Livro, Fone)
- ✅ 3 categorias
- ✅ 3 avaliações
- ✅ 1 carrinho com 2 itens

---

## ▶️ Executando o Projeto

### Opção 1: Executar TUDO de Uma Vez (Recomendado) ⚡

Este é o jeito mais fácil! Um único comando inicia todos os 10 serviços:

```bash
npm run start:all:dev
```

**O que acontece:**
- ✅ Inicia 9 microserviços (portas 3001-3009)
- ✅ Inicia o API Gateway (porta 3000)
- ✅ Todos rodam em modo desenvolvimento com hot-reload
- ✅ Logs coloridos para cada serviço

**Saída esperada:**
```
[USER] 🚀 User Service running on port 3001
[PROD] 🚀 Product Service running on port 3002
[CATL] 🚀 Catalog Service running on port 3003
[CART] 🚀 Cart Service running on port 3004
[ORDR] 🚀 Order Service running on port 3005
[PAYM] 🚀 Payment Service running on port 3006
[SHIP] 🚀 Shipping Service running on port 3007
[MAIL] 🚀 Mail Service running on port 3008
[REVW] 🚀 Review Service running on port 3009
[GTWY] 🚀 API Gateway running on port 3000
```

**Para parar todos os serviços:**
- Pressione `Ctrl+C` no terminal

---

### Opção 2: Executar Serviços Individualmente

Se preferir controle individual sobre cada serviço:

#### Windows PowerShell

```powershell
# Terminal 1 - User Service
npm run start:user

# Terminal 2 - Product Service
npm run start:product

# Terminal 3 - Catalog Service
npm run start:catalog

# Terminal 4 - Cart Service
npm run start:cart

# Terminal 5 - Order Service
npm run start:order

# Terminal 6 - Payment Service
npm run start:payment

# Terminal 7 - Shipping Service
npm run start:shipping

# Terminal 8 - Mail Service
npm run start:mail

# Terminal 9 - Review Service
npm run start:review

# Terminal 10 - API Gateway
npm run start:dev
```

#### Linux/Mac (Bash)

```bash
# Terminal 1 - User Service
PORT=3001 npm run start:user

# Terminal 2 - Product Service
PORT=3002 npm run start:product

# E assim por diante...
```

---

## 🧪 Testando a API

### Teste Rápido - Verificar se está funcionando

#### Windows PowerShell

```powershell
# Verificar se o Gateway está rodando
Invoke-RestMethod -Uri "http://localhost:3000" -Method GET

# Criar um usuário
$userData = @{
    name = "João Silva"
    email = "joao.silva@email.com"
    password = "senha123"
    dob = "1990-05-15"
    pfp = "https://example.com/avatar.jpg"
    identificationNumber = "12345678900"
    phoneNumber = "+5511999999999"
    address = @{
        street = "Av. Paulista, 1000"
        city = "São Paulo"
        state = "SP"
        zipCode = "01310-100"
        country = "Brasil"
    }
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method POST -Body $userData -ContentType "application/json"

# Listar produtos
Invoke-RestMethod -Uri "http://localhost:3000/api/products" -Method GET
```

#### Linux/Mac (curl)

```bash
# Criar um usuário
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao.silva@email.com",
    "password": "senha123",
    "dob": "1990-05-15",
    "pfp": "https://example.com/avatar.jpg",
    "identificationNumber": "12345678900",
    "phoneNumber": "+5511999999999",
    "address": {
      "street": "Av. Paulista, 1000",
      "city": "São Paulo",
      "state": "SP",
      "zipCode": "01310-100",
      "country": "Brasil"
    }
  }'

# Listar produtos
curl http://localhost:3000/api/products
```

### Exemplos Práticos

```powershell
# 1. Buscar produtos
Invoke-RestMethod -Uri "http://localhost:3000/api/catalog/search?q=smartphone" -Method GET

# 2. Adicionar ao carrinho
$cartItem = @{
    productId = "produto_id_aqui"
    quantity = 2
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/cart/usuario_id_aqui/items" -Method POST -Body $cartItem -ContentType "application/json"

# 3. Ver carrinho
Invoke-RestMethod -Uri "http://localhost:3000/api/cart/usuario_id_aqui" -Method GET

# 4. Fazer pedido
$orderData = @{
    userId = "usuario_id_aqui"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/orders/place" -Method POST -Body $orderData -ContentType "application/json"
```

---

## 📋 Endpoints Disponíveis

### 👤 User Service (`/api/users`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/users` | Criar usuário |
| GET | `/api/users/:id` | Buscar usuário |
| PUT | `/api/users/:id` | Atualizar usuário |
| DELETE | `/api/users/:id` | Deletar usuário |
| GET | `/api/users/:id/address` | Buscar endereço |

### 📦 Product Service (`/api/products`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/products` | Criar produto |
| GET | `/api/products/:id` | Buscar produto |
| PUT | `/api/products/:id` | Atualizar produto |
| DELETE | `/api/products/:id` | Deletar produto |

### 🔍 Catalog Service (`/api/catalog`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/catalog/search?q=query` | Buscar produtos |
| GET | `/api/catalog/highlights` | Produtos em destaque |
| GET | `/api/catalog/categories` | Listar categorias |
| GET | `/api/catalog/recommendations/:userId` | Recomendações |
| GET | `/api/catalog/related/:productId` | Produtos relacionados |
| GET | `/api/catalog/new-arrivals` | Novidades |

### 🛒 Cart Service (`/api/cart`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/cart/:userId/items` | Adicionar item |
| GET | `/api/cart/:userId` | Ver carrinho |
| DELETE | `/api/cart/:userId/items/:itemId` | Remover item |
| PUT | `/api/cart/:userId/items/:itemId/quantity` | Atualizar quantidade |
| DELETE | `/api/cart/:userId` | Limpar carrinho |

### 📦 Order Service (`/api/orders`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/orders/place` | Fazer pedido |
| GET | `/api/orders/:id` | Buscar pedido |
| PUT | `/api/orders/:id` | Atualizar pedido |
| DELETE | `/api/orders/:id` | Cancelar pedido |
| GET | `/api/orders/user/:userId` | Pedidos do usuário |

### 💳 Payment Service (`/api/payments`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/payments/process` | Processar pagamento |
| GET | `/api/payments/:id` | Detalhes do pagamento |
| POST | `/api/payments/:id/refund` | Reembolso |
| POST | `/api/payments/:id/confirm` | Confirmar pagamento |

### 🚚 Shipping Service (`/api/shipments`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/shipments` | Criar envio |
| GET | `/api/shipments/:id` | Detalhes do envio |
| PUT | `/api/shipments/:id` | Atualizar envio |
| GET | `/api/shipments/:id/track` | Rastrear envio |
| POST | `/api/shipping/calculate` | Calcular frete |
| PUT | `/api/shipments/:id/status` | Atualizar status |

### ⭐ Review Service (`/api/reviews`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/reviews` | Adicionar avaliação |
| GET | `/api/reviews/product/:productId` | Ver avaliações |
| PUT | `/api/reviews/:id` | Atualizar avaliação |
| DELETE | `/api/reviews/:id` | Deletar avaliação |

### 📧 Mail Service (`/api/mail`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/api/mail/send` | Enviar email |
| POST | `/api/mail/order-confirmation` | Confirmação de pedido |
| POST | `/api/mail/shipping-info` | Info de envio |

---

## 🗄️ Gerenciamento do Banco de Dados

### Comandos Úteis do Prisma

```bash
# Gerar/Atualizar Prisma Client
npm run prisma:generate

# Criar nova migration
npm run prisma:migrate

# Abrir Prisma Studio (Interface Visual)
npm run prisma:studio

# Popular banco com dados de exemplo
npm run db:seed

# RESETAR banco (CUIDADO: apaga tudo!)
npm run db:reset
```

### Prisma Studio

O Prisma Studio é uma interface visual para gerenciar o banco:

```bash
npm run prisma:studio
```

Acesse: `http://localhost:5555`

**O que você pode fazer:**
- ✅ Ver todos os dados em tabelas
- ✅ Adicionar, editar e deletar registros
- ✅ Navegar entre relacionamentos
- ✅ Exportar dados

---

## 🔧 Resolução de Problemas

### ❌ Erro: "Porta já está em uso"

**Windows:**
```powershell
# Ver processos na porta 3000
netstat -ano | findstr :3000

# Matar processo específico
taskkill /PID <NUMERO_DO_PID> /F

# Ou matar todos os processos Node
Get-Process node | Stop-Process -Force
```

**Linux/Mac:**
```bash
# Matar processo na porta 3000
lsof -ti:3000 | xargs kill -9

# Ou matar todos os processos Node
pkill -f node
```

### ❌ Erro: "Cannot find module '@prisma/client'"

```bash
npm run prisma:generate
```

### ❌ Erro: "Database file doesn't exist"

```bash
# Recriar o banco
npm run prisma:migrate

# Popular com dados
npm run db:seed
```

### ❌ Erro: "Usuário/Email já existe"

Isso acontece quando você tenta criar um usuário com email ou CPF duplicado.

**Solução 1:** Use dados diferentes
```bash
# Mude o email e identificationNumber
```

**Solução 2:** Resete o banco
```bash
npm run db:reset
```

### ❌ Erro: "Internal server error" ao criar usuário

Verifique os logs do **User Service** (`[USER]` no terminal). 

Possíveis causas:
- CPF ou email duplicado
- Banco de dados não foi inicializado
- Algum campo obrigatório está faltando

### ❌ Serviços não iniciam com `start:all:dev`

**Verificar:**
1. Todas as dependências estão instaladas?
   ```bash
   npm install
   ```

2. Prisma Client foi gerado?
   ```bash
   npm run prisma:generate
   ```

3. Banco de dados existe?
   ```bash
   npm run prisma:migrate
   npm run db:seed
   ```

### ❌ Como verificar se os serviços estão rodando?

**Windows:**
```powershell
# Ver todas as portas ativas
netstat -ano | findstr "300"
```

**Linux/Mac:**
```bash
# Ver portas ativas
lsof -i -P | grep 300
```

**Testar com curl:**
```bash
# Testar Gateway
curl http://localhost:3000

# Testar User Service diretamente
curl http://localhost:3001
```

---

## 📊 Schema do Banco de Dados

### Modelos Principais

```prisma
User {
  id: String
  name: String
  email: String (único)
  password: String
  identificationNumber: String (único)
  phoneNumber: String
  address: Address
  carts: Cart[]
  orders: Order[]
  reviews: Review[]
}

Product {
  id: String
  name: String
  description: String
  price: Decimal
  quantityInStock: Int
  category: Category
  reviews: Review[]
  cartItems: CartItem[]
}

Cart {
  id: String
  user: User
  items: CartItem[]
}

Order {
  id: String
  user: User
  items: OrderItem[]
  payment: Payment
  shipment: Shipment
  status: String
  totalAmount: Decimal
}
```

---

## 🛠️ Scripts Disponíveis

```json
{
  // Desenvolvimento
  "start:dev": "nest start --watch",           // Gateway em dev mode
  "start:all:dev": "npm run start:all:dev",    // TODOS os serviços
  
  // Serviços individuais
  "start:user": "...",
  "start:product": "...",
  "start:catalog": "...",
  // ... outros serviços
  
  // Prisma
  "prisma:generate": "prisma generate",        // Gerar client
  "prisma:migrate": "prisma migrate dev",      // Aplicar migrations
  "prisma:studio": "prisma studio",            // Interface visual
  
  // Banco de dados
  "db:seed": "ts-node prisma/seed.ts",        // Popular banco
  "db:reset": "prisma migrate reset --force",  // Resetar banco
  
  // Testes
  "test": "jest",                              // Testes unitários
  "test:e2e": "jest --config jest-e2e.json",  // Testes E2E
  
  // Build
  "build": "nest build",                       // Build produção
  "start:prod": "node dist/main"               // Rodar produção
}
```

---

## 📝 Notas Importantes

### ⚠️ Desenvolvimento vs Produção

- **Banco de dados:** SQLite é apenas para desenvolvimento. Para produção, use PostgreSQL ou MySQL.
- **Comunicação:** Serviços se comunicam via HTTP. Para produção, considere gRPC ou message queues.
- **Descoberta de serviços:** URLs são hardcoded. Para produção, use service discovery (Consul, Eureka).

### 🔐 Segurança

- **Autenticação:** Não implementada. Adicione JWT ou OAuth2 para produção.
- **Senhas:** São armazenadas em texto plano. Use bcrypt para hash de senhas.
- **Validação:** Adicione validação de entrada em todos os endpoints.

### 📈 Performance

- **Cache:** Considere adicionar Redis para cache.
- **Database pooling:** Configure connection pooling no Prisma.
- **Rate limiting:** Adicione rate limiting no Gateway.

---

## 📚 Recursos Adicionais

- [Documentação do NestJS](https://docs.nestjs.com/)
- [Documentação do Prisma](https://www.prisma.io/docs/)
- [Guia de Microserviços](https://microservices.io/)

---

## 📄 Licença

Shopwork é licenciado sob [MIT License](LICENSE).

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 👨‍💻 Autor

**Shopwork Team**

- GitHub: [@Ashlc](https://github.com/Ashlc)

---

## ⭐ Agradecimentos

Obrigado por usar Shopwork! Se este projeto te ajudou, considere dar uma ⭐ no GitHub!