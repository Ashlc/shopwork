# [Shopwork](https://github.com/Ashlc/shopwork): A microservices-based e-commerce framework

## 🏗️ Architecture

Shopwork is built using a **microservices architecture** with the following components:

- **API Gateway** (Port 3000) - Central entry point for all requests
- **User Service** (Port 3001) - User management and authentication
- **Product Service** (Port 3002) - Product CRUD operations
- **Catalog Service** (Port 3003) - Product discovery and search
- **Cart Service** (Port 3004) - Shopping cart management
- **Order Service** (Port 3005) - Order processing
- **Payment Service** (Port 3006) - Payment processing
- **Shipping Service** (Port 3007) - Shipping and logistics
- **Mail Service** (Port 3008) - Email notifications
- **Review Service** (Port 3009) - Product reviews

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Microservices

Each microservice can be started independently using these manual commands. **Open a separate terminal for each service:**

```powershell
# Start User Service (Terminal 1)
$env:PORT=3001; npx ts-node src/user-service/main.ts

# Start Product Service (Terminal 2)
$env:PORT=3002; npx ts-node -e "import { NestFactory } from '@nestjs/core'; import { ProductModule } from './src/modules/product/product.module'; async function bootstrap() { const app = await NestFactory.create(ProductModule); await app.listen(process.env.PORT || 3002); console.log('🚀 Product Service running on port ' + (process.env.PORT || 3002)); } bootstrap();"

# Start Catalog Service (Terminal 3)
$env:PORT=3003; npx ts-node -e "import { NestFactory } from '@nestjs/core'; import { CatalogModule } from './src/modules/catalog/catalog.module'; async function bootstrap() { const app = await NestFactory.create(CatalogModule); await app.listen(process.env.PORT || 3003); console.log('🚀 Catalog Service running on port ' + (process.env.PORT || 3003)); } bootstrap();"

# Start Cart Service (Terminal 4)
$env:PORT=3004; npx ts-node -e "import { NestFactory } from '@nestjs/core'; import { CartModule } from './src/modules/cart/cart.module'; async function bootstrap() { const app = await NestFactory.create(CartModule); await app.listen(process.env.PORT || 3004); console.log('🚀 Cart Service running on port ' + (process.env.PORT || 3004)); } bootstrap();"

# Start Order Service (Terminal 5)
$env:PORT=3005; npx ts-node -e "import { NestFactory } from '@nestjs/core'; import { OrderModule } from './src/modules/order/order.module'; async function bootstrap() { const app = await NestFactory.create(OrderModule); await app.listen(process.env.PORT || 3005); console.log('🚀 Order Service running on port ' + (process.env.PORT || 3005)); } bootstrap();"

# Start Payment Service (Terminal 6)
$env:PORT=3006; npx ts-node -e "import { NestFactory } from '@nestjs/core'; import { PaymentModule } from './src/modules/payment/payment.module'; async function bootstrap() { const app = await NestFactory.create(PaymentModule); await app.listen(process.env.PORT || 3006); console.log('🚀 Payment Service running on port ' + (process.env.PORT || 3006)); } bootstrap();"

# Start Shipping Service (Terminal 7)
$env:PORT=3007; npx ts-node -e "import { NestFactory } from '@nestjs/core'; import { ShippingModule } from './src/modules/shipping/shipping.module'; async function bootstrap() { const app = await NestFactory.create(ShippingModule); await app.listen(process.env.PORT || 3007); console.log('🚀 Shipping Service running on port ' + (process.env.PORT || 3007)); } bootstrap();"

# Start Mail Service (Terminal 8)
$env:PORT=3008; npx ts-node -e "import { NestFactory } from '@nestjs/core'; import { MailModule } from './src/modules/mail/mail.module'; async function bootstrap() { const app = await NestFactory.create(MailModule); await app.listen(process.env.PORT || 3008); console.log('🚀 Mail Service running on port ' + (process.env.PORT || 3008)); } bootstrap();"

# Start Review Service (Terminal 9)
$env:PORT=3009; npx ts-node -e "import { NestFactory } from '@nestjs/core'; import { ReviewModule } from './src/modules/review/review.module'; async function bootstrap() { const app = await NestFactory.create(ReviewModule); await app.listen(process.env.PORT || 3009); console.log('🚀 Review Service running on port ' + (process.env.PORT || 3009)); } bootstrap();"
```

### 3. Start API Gateway

```powershell
# Start API Gateway (Terminal 10)
$env:PORT=3000; npm start
```

## 🧪 Testing the API

### Test via API Gateway

All requests should go through the API Gateway at `http://localhost:3000/api`:

```powershell
# Create a user
$userData = @{
    name = "João Silva"
    email = "joao@email.com"
    password = "123456"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method POST -Body $userData -ContentType "application/json"

# Get user by ID
Invoke-RestMethod -Uri "http://localhost:3000/api/users/{user_id}" -Method GET

# Create a product
$productData = @{
    name = "Smartphone Samsung Galaxy S23"
    description = "Smartphone Android com 128GB"
    price = 2999.99
    quantityInStock = 50
    category = "Eletrônicos"
    imageUrl = "https://example.com/samsung-s23.jpg"
    brand = "Samsung"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/products" -Method POST -Body $productData -ContentType "application/json"

# Search products
Invoke-RestMethod -Uri "http://localhost:3000/api/catalog/search?q=smartphone" -Method GET

# Add to cart
$cartItem = @{
    productId = "prod_123"
    quantity = 2
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/cart/{user_id}/items" -Method POST -Body $cartItem -ContentType "application/json"
```

### Test Individual Services

You can also test services directly (for debugging):

```powershell
# Test User Service directly
Invoke-RestMethod -Uri "http://localhost:3001/users" -Method POST -Body $userData -ContentType "application/json"

# Test Product Service directly
Invoke-RestMethod -Uri "http://localhost:3002/products" -Method POST -Body $productData -ContentType "application/json"

# Test Catalog Service directly
Invoke-RestMethod -Uri "http://localhost:3003/catalog/search?q=smartphone" -Method GET
```

## 📋 Available Endpoints

### User Service (`/api/users`)
- `POST /api/users` - Create user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/:id/address` - Get user address

### Product Service (`/api/products`)
- `POST /api/products` - Create product
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Catalog Service (`/api/catalog`)
- `GET /api/catalog/search?q=query` - Search products
- `GET /api/catalog/highlights` - Get featured products
- `GET /api/catalog/categories` - Get product categories
- `GET /api/catalog/recommendations/:userId` - Get user recommendations
- `GET /api/catalog/related/:productId` - Get related products
- `GET /api/catalog/new-arrivals` - Get new arrivals

### Cart Service (`/api/cart`)
- `POST /api/cart/:userId/items` - Add item to cart
- `GET /api/cart/:userId` - Get user's cart
- `DELETE /api/cart/:userId/items/:itemId` - Remove item from cart
- `PUT /api/cart/:userId/items/:itemId/quantity` - Update item quantity
- `DELETE /api/cart/:userId` - Clear cart

### Order Service (`/api/orders`)
- `POST /api/orders/place` - Place order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Cancel order
- `GET /api/orders/user/:userId` - Get user's orders

### Payment Service (`/api/payments`)
- `POST /api/payments/process` - Open payment process
- `POST /api/payments` - Process payment
- `GET /api/payments/:id` - Get payment details
- `POST /api/payments/:id/refund` - Refund payment
- `POST /api/payments/:id/confirm` - Confirm payment

### Shipping Service (`/api/shipments`)
- `POST /api/shipments` - Create shipment
- `GET /api/shipments/:id` - Get shipment details
- `PUT /api/shipments/:id` - Update shipment
- `GET /api/shipments/:id/track` - Track shipment
- `POST /api/shipping/calculate` - Calculate shipping cost
- `PUT /api/shipments/:id/status` - Update shipment status

### Review Service (`/api/reviews`)
- `POST /api/reviews` - Add product review
- `GET /api/reviews/product/:productId` - Get product reviews
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Mail Service (`/api/mail`)
- `POST /api/mail/send` - Send email
- `POST /api/mail/order-confirmation` - Send order confirmation
- `POST /api/mail/shipping-info` - Send shipping information

## 🛠️ Development

### Run Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

### Build for Production

```bash
npm run build
```

## 🔧 Troubleshooting

### Port Already in Use

If you get "address already in use" errors:

```powershell
# Stop all Node.js processes
Get-Process node | Stop-Process -Force

# Or stop specific port
netstat -ano | findstr :3001
taskkill /PID <PID_NUMBER> /F
```

### Service Not Responding

1. Check if the service is running: `netstat -ano | findstr :300X`
2. Check the service logs for errors
3. Ensure all dependencies are installed: `npm install`

### Scripts Not Working

If the PowerShell scripts don't work, use the manual commands provided in the "Start Microservices" section. The scripts are provided for convenience but the manual commands are more reliable.

### Quick Test Commands

```powershell
# Test if services are running
Invoke-RestMethod -Uri "http://localhost:3001" -Method GET  # User Service
Invoke-RestMethod -Uri "http://localhost:3002" -Method GET  # Product Service
Invoke-RestMethod -Uri "http://localhost:3003" -Method GET  # Catalog Service
Invoke-RestMethod -Uri "http://localhost:3000" -Method GET  # API Gateway
```

## 📝 Notes

- Each microservice runs independently on its own port
- The API Gateway routes all requests to the appropriate microservice
- Services communicate via HTTP calls
- All services use in-memory storage (Map objects) for simplicity
- For production, consider using a proper database and service discovery

## 📄 License

Shopwork is [MIT licensed](https://github.com/Ashlc/shopwork/blob/master/LICENSE).
