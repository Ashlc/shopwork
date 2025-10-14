# ShopWork - Microservices Architecture

Este projeto implementa uma arquitetura de microserviços para e-commerce usando NestJS e API Gateway.

## Arquitetura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Service  │    │ Product Service │    │  Catalog Service│
│   Port: 3001    │    │   Port: 3002    │    │   Port: 3003    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  API Gateway    │
                    │   Port: 3000    │
                    └─────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Client App    │
                    └─────────────────┘
```

## Microserviços

### 1. User Service (Port 3001)
- Gestão de usuários
- Autenticação/autorização
- Endereços

### 2. Product Service (Port 3002)
- Catálogo de produtos
- Gestão de estoque
- Categorias

### 3. Catalog Service (Port 3003)
- Busca de produtos
- Recomendações
- Destaques

### 4. Cart Service (Port 3004)
- Carrinho de compras
- Sessões de usuário

### 5. Order Service (Port 3005)
- Processamento de pedidos
- Status de pedidos

### 6. Payment Service (Port 3006)
- Processamento de pagamentos
- Integração com gateways

### 7. Shipping Service (Port 3007)
- Gestão de envios
- Rastreamento

### 8. Mail Service (Port 3008)
- Emails
- Notificações

### 9. Review Service (Port 3009)
- Avaliações de produtos
- Comentários

## API Gateway

O API Gateway centraliza todas as rotas e orquestra os microserviços:

### Rotas Principais

#### Users
- `POST /api/users` - Criar usuário
- `GET /api/users/:id` - Buscar usuário
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário
- `GET /api/users/:id/address` - Buscar endereço

#### Products
- `POST /api/products` - Adicionar produto
- `GET /api/products/:id` - Buscar produto
- `PUT /api/products/:id` - Atualizar produto
- `DELETE /api/products/:id` - Deletar produto

#### Catalog
- `GET /api/catalog/search?q=query` - Buscar produtos
- `GET /api/catalog/highlights` - Destaques
- `GET /api/catalog/categories` - Categorias
- `GET /api/catalog/recommendations/:userId` - Recomendações
- `GET /api/catalog/related/:productId` - Produtos relacionados
- `GET /api/catalog/new-arrivals` - Novidades

#### Cart
- `POST /api/cart/:userId/items` - Adicionar ao carrinho
- `GET /api/cart/:userId` - Buscar carrinho
- `DELETE /api/cart/:userId/items/:itemId` - Remover do carrinho
- `DELETE /api/cart/:userId` - Limpar carrinho
- `PUT /api/cart/:userId/items/:itemId/quantity` - Atualizar quantidade

#### Orders
- `POST /api/orders/place` - Finalizar pedido
- `GET /api/orders/:id` - Buscar pedido
- `PUT /api/orders/:id` - Atualizar pedido
- `DELETE /api/orders/:id` - Cancelar pedido
- `GET /api/orders/user/:userId` - Listar pedidos do usuário

#### Payments
- `POST /api/payments/process` - Processar pagamento
- `POST /api/payments` - Criar pagamento
- `GET /api/payments/:id` - Buscar pagamento
- `POST /api/payments/:id/refund` - Reembolsar
- `POST /api/payments/:id/confirm` - Confirmar pagamento

#### Shipping
- `POST /api/shipments` - Criar envio
- `GET /api/shipments/:id` - Buscar envio
- `PUT /api/shipments/:id` - Atualizar envio
- `GET /api/shipments/:id/track` - Rastrear envio
- `POST /api/shipping/calculate` - Calcular frete
- `PUT /api/shipments/:id/status` - Atualizar status

#### Reviews
- `POST /api/reviews` - Adicionar avaliação
- `GET /api/reviews/product/:productId` - Buscar avaliações
- `PUT /api/reviews/:id` - Atualizar avaliação
- `DELETE /api/reviews/:id` - Deletar avaliação

#### Mail
- `POST /api/mail/send` - Enviar email
- `POST /api/mail/order-confirmation` - Confirmação de pedido
- `POST /api/mail/shipping-info` - Informações de envio
- `POST /api/mail/password-reset` - Reset de senha

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# API Gateway
PORT=3000

# Microservices URLs
USER_SERVICE_URL=http://localhost:3001
PRODUCT_SERVICE_URL=http://localhost:3002
CATALOG_SERVICE_URL=http://localhost:3003
CART_SERVICE_URL=http://localhost:3004
ORDER_SERVICE_URL=http://localhost:3005
PAYMENT_SERVICE_URL=http://localhost:3006
SHIPPING_SERVICE_URL=http://localhost:3007
MAIL_SERVICE_URL=http://localhost:3008
REVIEW_SERVICE_URL=http://localhost:3009

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/shopwork_db"

# JWT
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=24h

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Payment Gateway
PAYMENT_GATEWAY_API_KEY=your-payment-gateway-key
PAYMENT_GATEWAY_SECRET=your-payment-gateway-secret

# Shipping
SHIPPING_API_KEY=your-shipping-api-key
SHIPPING_BASE_URL=https://api.shipping-provider.com
```

## Instalação e Execução

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Banco de Dados
```bash
# Configurar Prisma
npx prisma generate
npx prisma db push
```

### 3. Executar API Gateway
```bash
npm run start:dev
```

### 4. Executar Microserviços Individuais
```bash
# User Service
PORT=3001 npm run start:dev

# Product Service
PORT=3002 npm run start:dev

# Catalog Service
PORT=3003 npm run start:dev

# Cart Service
PORT=3004 npm run start:dev

# Order Service
PORT=3005 npm run start:dev

# Payment Service
PORT=3006 npm run start:dev

# Shipping Service
PORT=3007 npm run start:dev

# Mail Service
PORT=3008 npm run start:dev

# Review Service
PORT=3009 npm run start:dev
```

## Operações Complexas

### Finalizar Pedido
```bash
POST /api/orders/place
{
  "userId": "user123",
  "method": "credit_card"
}
```

Esta operação:
1. Busca o carrinho do usuário
2. Calcula o frete
3. Cria o pedido
4. Processa o pagamento
5. Limpa o carrinho

### Confirmar Pagamento
```bash
POST /api/payments/:paymentId/confirm
```

Esta operação:
1. Verifica o status do pagamento
2. Envia confirmação por email

## Vantagens da Arquitetura

- **Escalabilidade Independente**: Cada serviço escala conforme demanda
- **Tecnologia Flexível**: Cada serviço pode usar tecnologias diferentes
- **Falhas Isoladas**: Falha em um serviço não afeta outros
- **Deploy Independente**: Cada serviço pode ser deployado separadamente
- **Equipes Independentes**: Diferentes equipes podem trabalhar em serviços diferentes

## Próximos Passos

1. Implementar autenticação JWT
2. Adicionar circuit breakers
3. Implementar logging centralizado
4. Adicionar monitoramento (Prometheus/Grafana)
5. Implementar service mesh (Istio)
6. Adicionar testes de integração
7. Configurar CI/CD
