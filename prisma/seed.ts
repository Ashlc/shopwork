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
  ]);
  console.log(`✅ ${categories.length} categorias criadas\n`);

  // Criar produtos
  console.log('📱 Criando produtos...');
  const products = await Promise.all([
    prisma.product.create({
      data: {
        id: 'prod_1',
        name: 'Smartphone Galaxy S24',
        description: 'Smartphone premium com câmera de 108MP',
        price: 2999.99,
        category: 'Eletrônicos',
        quantityInStock: 50,
        imageUrl: 'https://example.com/galaxy-s24.jpg',
      },
    }),
    prisma.product.create({
      data: {
        id: 'prod_2',
        name: 'Notebook Dell XPS 13',
        description: 'Notebook ultrabook com processador Intel i7',
        price: 4999.99,
        category: 'Eletrônicos',
        quantityInStock: 25,
        imageUrl: 'https://example.com/dell-xps13.jpg',
      },
    }),
    prisma.product.create({
      data: {
        id: 'prod_3',
        name: 'Tênis Nike Air Max',
        description: 'Tênis esportivo confortável',
        price: 399.99,
        category: 'Calçados',
        quantityInStock: 100,
        imageUrl: 'https://example.com/nike-airmax.jpg',
      },
    }),
    prisma.product.create({
      data: {
        id: 'prod_4',
        name: 'Camiseta Polo Lacoste',
        description: 'Camiseta polo de algodão premium',
        price: 199.99,
        category: 'Roupas',
        quantityInStock: 75,
        imageUrl: 'https://example.com/lacoste-polo.jpg',
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
      productId: products[2].id,
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
