export const environment = {
  // API Gateway Configuration
  port: process.env.PORT || 3000,

  // Microservices URLs
  services: {
    user: process.env.USER_SERVICE_URL || 'http://localhost:3001',
    product: process.env.PRODUCT_SERVICE_URL || 'http://localhost:3002',
    catalog: process.env.CATALOG_SERVICE_URL || 'http://localhost:3003',
    cart: process.env.CART_SERVICE_URL || 'http://localhost:3004',
    order: process.env.ORDER_SERVICE_URL || 'http://localhost:3005',
    payment: process.env.PAYMENT_SERVICE_URL || 'http://localhost:3006',
    shipping: process.env.SHIPPING_SERVICE_URL || 'http://localhost:3007',
    mail: process.env.MAIL_SERVICE_URL || 'http://localhost:3008',
    review: process.env.REVIEW_SERVICE_URL || 'http://localhost:3009',
  },

  // Database Configuration
  database: {
    url: process.env.DATABASE_URL || 'postgresql://username:password@localhost:5432/shopwork_db',
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-jwt-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
  },

  // Email Configuration
  email: {
    smtp: {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      user: process.env.SMTP_USER || 'your-email@gmail.com',
      pass: process.env.SMTP_PASS || 'your-app-password',
    },
  },

  // Payment Gateway Configuration
  payment: {
    apiKey: process.env.PAYMENT_GATEWAY_API_KEY || 'your-payment-gateway-key',
    secret: process.env.PAYMENT_GATEWAY_SECRET || 'your-payment-gateway-secret',
  },

  // Shipping Configuration
  shipping: {
    apiKey: process.env.SHIPPING_API_KEY || 'your-shipping-api-key',
    baseUrl: process.env.SHIPPING_BASE_URL || 'https://api.shipping-provider.com',
  },
};
