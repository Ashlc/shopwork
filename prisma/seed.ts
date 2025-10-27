import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...\n');

  // Limpar dados existentes
  console.log('🧹 Limpando dados existentes...');
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.shipment.deleteMany();
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.address.deleteMany();
  console.log('✅ Dados limpos\n');

  // Criar categorias
  console.log('📦 Criando categorias...');
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Eletrônicos',
        description: 'Produtos eletrônicos e tecnologia',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Roupas',
        description: 'Vestuário e acessórios',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Livros',
        description: 'Livros e publicações',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Acessórios',
        description: 'Acessórios para eletrônicos e informática',
      },
    }),
  ]);
  console.log(`✅ ${categories.length} categorias criadas\n`);

  // Criar produtos
  console.log('📱 Criando produtos...');
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Edifier Wireless Headphones W600BT',
        description: 'Noise-cancelling over-ear headphones with long battery life.',
        price: 39.99,
        category: 'Eletrônicos',
        quantityInStock: 50,
        imageUrl: 'https://edifier.com.br/media/catalog/product/cache/eba5f2f163b55172c022905d0dc2efd7/f/o/fone-bluetooth-edifier-w600bt-pret_1.jpg',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Sencor Sirius 2 Mini Black Bluetooth Speaker',
        description: 'High-quality portable speaker with deep bass.',
        price: 199.99,
        category: 'Eletrônicos',
        quantityInStock: 30,
        imageUrl: 'https://www.sencor.com/Sencor/media/static-media/6770caad-d0be-4d0d-b5f0-01bbc4c1c555@w600.webp',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Smartwatch X-Watch Preto XSWUQPI001A',
        description: 'Feature-rich smartwatch with health tracking.',
        price: 299.99,
        category: 'Eletrônicos',
        quantityInStock: 20,
        imageUrl: 'https://images.tcdn.com.br/img/img_prod/1087072/relogio_smartwatch_x_watch_preto_com_alexa_1460_1_acdfd0a488affed854938b88c640670c.jpg',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Elite Power Laptop Stand with Wireless Charger',
        description: 'Ergonomic aluminum laptop stand for better posture.',
        price: 49.99,
        category: 'Acessórios',
        quantityInStock: 75,
        imageUrl: 'https://alogic.co/cdn/shop/files/Alogic_Elite_Power_Laptop_Stand_With_Wireless_Charger_Black_1.webp?v=1751890807',
      },
    }),
    prisma.product.create({
      data: {
        name: 'UGREEN Hub USB C 4 portas',
        description: 'Hub USB C estendido: este hub adaptador fino USB-C preenche a lacuna entre USB-A e USB-C para conectar dispositivos mais antigos ao seu novo laptop USB C, expanda a única porta tipo C ou thunderbolt 3 em 4 portas USB 3.0 fêmeas padrão. 5 Gbps de alta velocidade: Hub USB C 4 portas suportam transferência de dados super rápida de até 5 Gbps - 10X mais rápido que USB 2.0. Você pode transferir fotos, vídeos e arquivos grandes em segundos, economizando seu tempo precioso.',
        price: 39.99,
        category: 'Acessórios',
        quantityInStock: 100,
        imageUrl: 'https://m.media-amazon.com/images/I/61KRLch6voL.jpg',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Keychron Q1 QMK Custom Mechanical Keyboard',
        description: 'Keychron Q1 is a fully customized 75% layout mechanical keyboard packed with all premium features and unlimited possibilities. RGB backlit mechanical keyboard with blue switches.',
        price: 129.99,
        category: 'Eletrônicos',
        quantityInStock: 40,
        imageUrl: 'https://keychron.ph/cdn/shop/products/Keychron-Q1-custom-mechanical-keyboard-green-version-red_3b2b5520-b8f2-42b4-a769-629cc2fb3084.jpg',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Wireless Mouse M185 SWIFT GREY 2.4GHZ Logitech',
        description: 'Ergonomic wireless mouse with adjustable DPI.',
        price: 34.99,
        category: 'Eletrônicos',
        quantityInStock: 60,
        imageUrl: 'https://www.lojamundi.com.br/imagens/produtos/Wireless-Mouse-M185-SWIFT-GREY-2.4GHZ-Logitech.jpg',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Apple Phone Silicone Case',
        description: 'Durable silicone phone case with shock absorption.',
        price: 19.99,
        category: 'Acessórios',
        quantityInStock: 150,
        imageUrl: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MT233?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=L0k2OWM4cGRyZzBTVVMwTnB2NEZmd2tuVHYzMERCZURia3c5SzJFOTlPalpQUlZGaitSQjJVekdLRWQ5QlBiN2pwVWYxQWxURXh2M0VKZnNpT1ZIYnc',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Anker PowerCore Portable Charger',
        description: '20000mAh power bank with fast charging support.',
        price: 44.99,
        category: 'Eletrônicos',
        quantityInStock: 80,
        imageUrl: 'https://i5.walmartimages.com/seo/Anker-PowerCore-Select-10000-Portable-Charger-Black-Ultra-Compact-High-Speed-Charging-Technology-Phone-Charger-for-iPhone-Samsung-and-More_621e9d8d-b4b2-4e15-b4cd-b439561ec4d0.c822834630c31c13416f2aacb33ddd5e.jpeg',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Gamer Monitor PCFort T2703-200 27" 1ms 200hz',
        description: '27-inch 4K monitor with HDR support.',
        price: 399.99,
        category: 'Eletrônicos',
        quantityInStock: 25,
        imageUrl: 'https://images.tcdn.com.br/img/img_prod/740836/monitor_gamer_pcfort_t2703_200_27_1ms_200hz_led_full_hd_100_srgb_freesync_gsync_display_port_hdmi_dv_23949_1_f8f7555b22ce74e6784de4ac7661f352.jpg',
      },
    }),
  ]);
  console.log(`✅ ${products.length} produtos criados\n`);

  // Criar usuários
  console.log('👥 Criando usuários...');
  const address1 = await prisma.address.create({
    data: {
      street: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      country: 'Brasil',
    },
  });

  const address2 = await prisma.address.create({
    data: {
      street: 'Av. Paulista, 1000',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100',
      country: 'Brasil',
    },
  });

  const user1 = await prisma.user.create({
    data: {
      name: 'João Silva',
      email: 'joao@teste.com',
      password: 'senha123',
      dob: '1990-01-01',
      pfp: 'https://example.com/joao.jpg',
      identificationNumber: '12345678901',
      phoneNumber: '+5511999999999',
      role: 'user',
      addressId: address1.id,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Maria Santos',
      email: 'maria@teste.com',
      password: 'senha123',
      dob: '1995-05-15',
      pfp: 'https://example.com/maria.jpg',
      identificationNumber: '98765432100',
      phoneNumber: '+5511988887777',
      role: 'user',
      addressId: address2.id,
    },
  });
  console.log('✅ 2 usuários criados\n');

  // Criar avaliações
  console.log('⭐ Criando avaliações...');
  const reviews = await Promise.all([
    prisma.review.create({
      data: {
        userId: user1.id,
        productId: products[0].id,
        rating: 5,
        comment: 'Excelente produto! Superou minhas expectativas.',
      },
    }),
    prisma.review.create({
      data: {
        userId: user2.id,
        productId: products[0].id,
        rating: 4,
        comment: 'Muito bom, mas poderia ter mais memória.',
      },
    }),
    prisma.review.create({
      data: {
        userId: user1.id,
        productId: products[3].id,
        rating: 5,
        comment: 'Livro essencial para qualquer programador!',
      },
    }),
  ]);
  console.log(`✅ ${reviews.length} avaliações criadas\n`);

  // Criar carrinhos
  console.log('🛒 Criando carrinhos...');
  const cart1 = await prisma.cart.create({
    data: {
      userId: user1.id,
    },
  });

  await prisma.cartItem.create({
    data: {
      cartId: cart1.id,
      productId: products[1].id,
      quantity: 1,
    },
  });

  await prisma.cartItem.create({
    data: {
      cartId: cart1.id,
      productId: products[4].id,
      quantity: 2,
    },
  });
  console.log('✅ Carrinhos criados\n');

  console.log('✨ Seed concluído com sucesso!\n');
  console.log('📊 Resumo:');
  console.log(`   - ${categories.length} categorias`);
  console.log(`   - ${products.length} produtos`);
  console.log(`   - 2 usuários`);
  console.log(`   - ${reviews.length} avaliações`);
  console.log(`   - 1 carrinho com 2 itens`);
  console.log('\n🚀 Você pode iniciar o servidor agora: npm run start:dev\n');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
