import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ICategory, IProduct } from 'src/interfaces/models';
import { ICatalogService } from 'src/interfaces/services';

@Injectable()
export class CatalogService implements ICatalogService {
  constructor(private prisma: PrismaService) {}

  async searchProducts(query: string): Promise<IProduct[]> {
    const searchTerm = query;

    const products = await this.prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm } },
          { description: { contains: searchTerm } },
          { category: { contains: searchTerm } },
        ],
      },
    });

    const results = products.map(product => this.mapToIProduct(product));
    console.log(`✅ ${results.length} produtos encontrados para: "${query}"`);
    return results;
  }

  async filterProducts(filters: any): Promise<IProduct[]> {
    const where: any = {};

    if (filters.category) {
      where.category = filters.category;
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      where.price = {};
      if (filters.minPrice !== undefined) {
        where.price.gte = filters.minPrice;
      }
      if (filters.maxPrice !== undefined) {
        where.price.lte = filters.maxPrice;
      }
    }

    if (filters.inStock) {
      where.quantityInStock = { gt: 0 };
    }

    const products = await this.prisma.product.findMany({ where });
    const results = products.map(product => this.mapToIProduct(product));

    console.log(`✅ ${results.length} produtos encontrados com filtros aplicados`);
    return results;
  }

  async getHighlights(): Promise<IProduct[]> {
    // Produtos em destaque (produtos com maior estoque)
    const products = await this.prisma.product.findMany({
      where: { quantityInStock: { gt: 20 } },
      orderBy: { quantityInStock: 'desc' },
      take: 3,
    });

    const highlights = products.map(product => this.mapToIProduct(product));
    console.log(`✅ ${highlights.length} produtos em destaque`);
    return highlights;
  }

  async getProductCategories(): Promise<ICategory[]> {
    const categories = await this.prisma.category.findMany();
    const results = categories.map(cat => this.mapToICategory(cat));
    console.log(`✅ ${results.length} categorias encontradas`);
    return results;
  }

  //TODO: sistema de recomendação menos aleatório
  async recommendProducts(userId: string): Promise<IProduct[]> {
    // Simulação de recomendação baseada em histórico (exemplo simples)
    const products = await this.prisma.product.findMany({
      where: { quantityInStock: { gt: 0 } },
    });

    const recommendations = products
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(product => this.mapToIProduct(product));

    console.log(`✅ ${recommendations.length} produtos recomendados para usuário:`, userId);
    return recommendations;
  }

  async getRelatedProducts(productId: string): Promise<IProduct[]> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return [];
    }

    const related = await this.prisma.product.findMany({
      where: {
        id: { not: productId },
        category: product.category,
      },
      take: 3,
    });

    const results = related.map(p => this.mapToIProduct(p));
    console.log(`✅ ${results.length} produtos relacionados encontrados para:`, productId);
    return results;
  }

  async getNewArrivals(): Promise<IProduct[]> {
    // Produtos mais recentes (últimos 30 dias)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const newArrivals = await this.prisma.product.findMany({
      where: {
        createdAt: { gte: thirtyDaysAgo },
      },
      orderBy: { createdAt: 'desc' },
    });

    const results = newArrivals.map(product => this.mapToIProduct(product));
    console.log(`✅ ${results.length} produtos novos encontrados`);
    return results;
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

  private mapToICategory(category: any): ICategory {
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      createdAt: category.createdAt.toISOString(),
      updatedAt: category.updatedAt.toISOString(),
    };
  }
}
