import { Injectable } from '@nestjs/common';
import { ICart, ICartItem, IProduct } from 'src/interfaces/models';
import { ICartService } from 'src/interfaces/services';

@Injectable()
export class CartService implements ICartService {
  private carts: Map<string, ICart> = new Map();

  async addItemToCart(userId: string, itemData: any): Promise<ICart> {
    let cart = this.carts.get(userId);
    
    if (!cart) {
      cart = {
        id: `cart_${userId}_${Date.now()}`,
        userId,
        products: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    const existingItemIndex = cart.products.findIndex(item => item.productId === itemData.productId);
    
    if (existingItemIndex >= 0) {
      cart.products[existingItemIndex].quantity += itemData.quantity || 1;
    } else {
      const product: IProduct = {
        id: itemData.productId,
        name: itemData.name || 'Produto',
        description: itemData.description || '',
        price: itemData.price || 0,
        category: itemData.category || '',
        quantityInStock: itemData.stock || 0,
        imageUrl: itemData.imageUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const cartItem: ICartItem = {
        id: `item_${Date.now()}`,
        productId: itemData.productId,
        product,
        quantity: itemData.quantity || 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      cart.products.push(cartItem);
    }

    cart.updatedAt = new Date().toISOString();
    this.carts.set(userId, cart);
    console.log('✅ Item adicionado ao carrinho:', itemData.name);
    return cart;
  }

  async removeItemFromCart(userId: string, itemId: string): Promise<ICart> {
    const cart = this.carts.get(userId);
    
    if (!cart) {
      throw new Error('Carrinho não encontrado');
    }

    cart.products = cart.products.filter(item => item.id !== itemId);
    cart.updatedAt = new Date().toISOString();
    
    this.carts.set(userId, cart);
    console.log('✅ Item removido do carrinho:', itemId);
    return cart;
  }

  async getCart(userId: string): Promise<ICart> {
    const cart = this.carts.get(userId);
    
    if (!cart) {
      return {
        id: `cart_${userId}_${Date.now()}`,
        userId,
        products: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    console.log('✅ Carrinho recuperado para usuário:', userId);
    return cart;
  }

  async clearCart(userId: string): Promise<void> {
    this.carts.delete(userId);
    console.log('✅ Carrinho limpo para usuário:', userId);
  }

  async updateItemQuantity(
    userId: string,
    itemId: string,
    quantity: number,
  ): Promise<ICart> {
    const cart = this.carts.get(userId);
    
    if (!cart) {
      throw new Error('Carrinho não encontrado');
    }

    const item = cart.products.find(item => item.id === itemId);
    if (!item) {
      throw new Error('Item não encontrado no carrinho');
    }

    if (quantity <= 0) {
      return this.removeItemFromCart(userId, itemId);
    }

    item.quantity = quantity;
    item.updatedAt = new Date().toISOString();
    cart.updatedAt = new Date().toISOString();
    
    this.carts.set(userId, cart);
    console.log('✅ Quantidade atualizada no carrinho:', itemId, 'para', quantity);
    return cart;
  }
}
