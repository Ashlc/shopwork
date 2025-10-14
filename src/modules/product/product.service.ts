import { Injectable } from '@nestjs/common';
import { IProduct } from 'src/interfaces/models';
import { IProductService } from 'src/interfaces/services';

@Injectable()
export class ProductService implements IProductService {
  private products: Map<string, IProduct> = new Map();

  async addProduct(
    productData: Omit<IProduct, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<IProduct> {
    if (productData.price <= 0) {
      throw new Error('Preço deve ser maior que zero');
    }

    if (productData.quantityInStock < 0) {
      throw new Error('Estoque não pode ser negativo');
    }

    const product: IProduct = {
      id: `prod_${Date.now()}`,
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.products.set(product.id, product);
    console.log('✅ Produto adicionado:', product.name, 'ID:', product.id);
    return product;
  }

  async getProduct(productId: string): Promise<IProduct> {
    const product = this.products.get(productId);
    
    if (!product) {
      throw new Error('Produto não encontrado');
    }

    console.log('✅ Produto encontrado:', product.name);
    return product;
  }

  async updateProduct(
    productId: string,
    productData: Partial<IProduct>,
  ): Promise<IProduct> {
    const product = this.products.get(productId);
    
    if (!product) {
      throw new Error('Produto não encontrado');
    }

    if (productData.price !== undefined && productData.price <= 0) {
      throw new Error('Preço deve ser maior que zero');
    }

    if (productData.quantityInStock !== undefined && productData.quantityInStock < 0) {
      throw new Error('Estoque não pode ser negativo');
    }

    const updatedProduct = {
      ...product,
      ...productData,
      updatedAt: new Date().toISOString(),
    };

    this.products.set(productId, updatedProduct);
    console.log('✅ Produto atualizado:', productId);
    return updatedProduct;
  }

  async deleteProduct(productId: string): Promise<void> {
    const product = this.products.get(productId);
    
    if (!product) {
      throw new Error('Produto não encontrado');
    }

    this.products.delete(productId);
    console.log('✅ Produto removido:', productId);
  }
}
