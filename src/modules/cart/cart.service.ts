import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import BaseCartService from 'src/framework/abstract/cart.abstract';
import { ICart, ICartItem, IProduct } from 'src/interfaces/models';

@Injectable()
export class CartService extends BaseCartService {
  constructor(private prisma: PrismaService) {
    super();
  }

  async addItemToCart(userId: string, itemData: any): Promise<ICart> {
    // Verificar se produto existe
    const product = await this.prisma.product.findUnique({
      where: { id: itemData.productId },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    // Buscar ou criar carrinho
    let cart = await this.prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: {
          userId,
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    }

    // Verificar se item já existe no carrinho
    const existingItem = cart.items.find(
      (item) => item.productId === itemData.productId,
    );

    if (existingItem) {
      // Atualizar quantidade
      await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + (itemData.quantity || 1),
        },
      });
    } else {
      // Adicionar novo item
      await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: itemData.productId,
          quantity: itemData.quantity || 1,
        },
      });
    }

    // Buscar carrinho atualizado
    const updatedCart = await this.prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    console.log('✅ Item adicionado ao carrinho:', product.name);
    return this.mapToICart(updatedCart!);
  }

  async removeItemFromCart(userId: string, itemId: string): Promise<ICart> {
    const cart = await this.prisma.cart.findFirst({
      where: { userId },
    });

    if (!cart) {
      throw new NotFoundException('Carrinho não encontrado');
    }

    const item = await this.prisma.cartItem.findUnique({
      where: { id: itemId },
    });

    if (!item || item.cartId !== cart.id) {
      throw new NotFoundException('Item não encontrado no carrinho');
    }

    await this.prisma.cartItem.delete({
      where: { id: itemId },
    });

    const updatedCart = await this.prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    console.log('✅ Item removido do carrinho:', itemId);
    return this.mapToICart(updatedCart!);
  }

  async getCart(userId: string): Promise<ICart> {
    let cart = await this.prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      // Criar carrinho vazio
      cart = await this.prisma.cart.create({
        data: {
          userId,
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    }

    console.log('✅ Carrinho recuperado para usuário:', userId);
    return this.mapToICart(cart);
  }

  async clearCart(userId: string): Promise<void> {
    const cart = await this.prisma.cart.findFirst({
      where: { userId },
    });

    if (cart) {
      await this.prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
      console.log('✅ Carrinho limpo para usuário:', userId);
    }
  }

  async updateItemQuantity(
    userId: string,
    itemId: string,
    quantity: number,
  ): Promise<ICart> {
    const cart = await this.prisma.cart.findFirst({
      where: { userId },
    });

    if (!cart) {
      throw new NotFoundException('Carrinho não encontrado');
    }

    const item = await this.prisma.cartItem.findUnique({
      where: { id: itemId },
    });

    if (!item || item.cartId !== cart.id) {
      throw new NotFoundException('Item não encontrado no carrinho');
    }

    if (quantity <= 0) {
      return this.removeItemFromCart(userId, itemId);
    }

    await this.prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    const updatedCart = await this.prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    console.log(
      '✅ Quantidade atualizada no carrinho:',
      itemId,
      'para',
      quantity,
    );
    return this.mapToICart(updatedCart!);
  }

  private mapToICart(cart: any): ICart {
    return {
      id: cart.id,
      userId: cart.userId,
      products: cart.items.map((item: any) => this.mapToICartItem(item)),
      createdAt: cart.createdAt.toISOString(),
      updatedAt: cart.updatedAt.toISOString(),
    };
  }

  private mapToICartItem(item: any): ICartItem {
    return {
      id: item.id,
      productId: item.productId,
      product: this.mapToIProduct(item.product),
      quantity: item.quantity,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    };
  }

  private mapToIProduct(product: any): IProduct {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      quantityInStock: product.quantityInStock,
      imageUrl: product.imageUrl,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    };
  }
}
