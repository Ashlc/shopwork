import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { IProduct } from 'src/interfaces/models';
import { IProductService } from 'src/interfaces/services';

@Injectable()
export class ProductService implements IProductService {
  constructor(private prisma: PrismaService) {}

  async addProduct(
    productData: Omit<IProduct, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<IProduct> {
    if (productData.price <= 0) {
      throw new BadRequestException('Preço deve ser maior que zero');
    }

    if (productData.quantityInStock < 0) {
      throw new BadRequestException('Estoque não pode ser negativo');
    }

    const product = await this.prisma.product.create({
      data: {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        category: productData.category,
        quantityInStock: productData.quantityInStock,
        imageUrl: productData.imageUrl,
      },
    });

    console.log('✅ Produto adicionado ao banco:', product.name, 'ID:', product.id);
    return this.mapToIProduct(product);
  }

  async getProduct(productId: string): Promise<IProduct> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    console.log('✅ Produto encontrado no banco:', product.name);
    return this.mapToIProduct(product);
  }

  async getAllProducts(): Promise<IProduct[]> {
    const products = await this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });

    console.log(`✅ Encontrados ${products.length} produtos no banco`);
    return products.map(product => this.mapToIProduct(product));
  }

  async updateProduct(
    productId: string,
    productData: Partial<IProduct>,
  ): Promise<IProduct> {
    // Verificar se produto existe
    await this.getProduct(productId);

    if (productData.price !== undefined && productData.price <= 0) {
      throw new BadRequestException('Preço deve ser maior que zero');
    }

    if (productData.quantityInStock !== undefined && productData.quantityInStock < 0) {
      throw new BadRequestException('Estoque não pode ser negativo');
    }

    const updateData: any = {};
    if (productData.name) updateData.name = productData.name;
    if (productData.description !== undefined) updateData.description = productData.description;
    if (productData.price !== undefined) updateData.price = productData.price;
    if (productData.category) updateData.category = productData.category;
    if (productData.quantityInStock !== undefined) updateData.quantityInStock = productData.quantityInStock;
    if (productData.imageUrl !== undefined) updateData.imageUrl = productData.imageUrl;

    const updatedProduct = await this.prisma.product.update({
      where: { id: productId },
      data: updateData,
    });

    console.log('✅ Produto atualizado no banco:', productId);
    return this.mapToIProduct(updatedProduct);
  }

  async deleteProduct(productId: string): Promise<void> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    await this.prisma.product.delete({
      where: { id: productId },
    });

    console.log('✅ Produto removido do banco:', productId);
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
