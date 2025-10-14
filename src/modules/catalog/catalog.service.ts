import { Injectable } from '@nestjs/common';
import { ICategory, IProduct } from 'src/interfaces/models';
import { ICatalogService } from 'src/interfaces/services';

@Injectable()
export class CatalogService implements ICatalogService {
  private products: IProduct[] = [
    {
      id: 'prod_1',
      name: 'Smartphone Galaxy S24',
      description: 'Smartphone premium com câmera de 108MP',
      price: 2999.99,
      category: 'Eletrônicos',
      quantityInStock: 50,
      imageUrl: 'https://example.com/galaxy-s24.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'prod_2',
      name: 'Notebook Dell XPS 13',
      description: 'Notebook ultrabook com processador Intel i7',
      price: 4999.99,
      category: 'Eletrônicos',
      quantityInStock: 25,
      imageUrl: 'https://example.com/dell-xps13.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'prod_3',
      name: 'Tênis Nike Air Max',
      description: 'Tênis esportivo confortável',
      price: 399.99,
      category: 'Calçados',
      quantityInStock: 100,
      imageUrl: 'https://example.com/nike-airmax.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'prod_4',
      name: 'Camiseta Polo Lacoste',
      description: 'Camiseta polo de algodão premium',
      price: 199.99,
      category: 'Roupas',
      quantityInStock: 75,
      imageUrl: 'https://example.com/lacoste-polo.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  private categories: ICategory[] = [
    {
      id: 'cat_1',
      name: 'Eletrônicos',
      description: 'Smartphones, notebooks, tablets e acessórios',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'cat_2',
      name: 'Calçados',
      description: 'Tênis, sapatos, sandálias e botas',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'cat_3',
      name: 'Roupas',
      description: 'Camisetas, calças, vestidos e acessórios',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  async searchProducts(query: string): Promise<IProduct[]> {
    const searchTerm = query.toLowerCase();
    const results = this.products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );

    console.log(`✅ ${results.length} produtos encontrados para: "${query}"`);
    return results;
  }

  async filterProducts(filters: any): Promise<IProduct[]> {
    let results = [...this.products];

    if (filters.category) {
      results = results.filter(product => product.category === filters.category);
    }

    if (filters.minPrice !== undefined) {
      results = results.filter(product => product.price >= filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
      results = results.filter(product => product.price <= filters.maxPrice);
    }

    if (filters.inStock) {
      results = results.filter(product => product.quantityInStock > 0);
    }

    console.log(`✅ ${results.length} produtos encontrados com filtros aplicados`);
    return results;
  }

  async getHighlights(): Promise<IProduct[]> {
    // Produtos em destaque (exemplo: produtos com maior estoque e preços atrativos)
    const highlights = this.products
      .filter(product => product.quantityInStock > 20)
      .sort((a, b) => b.quantityInStock - a.quantityInStock)
      .slice(0, 3);

    console.log(`✅ ${highlights.length} produtos em destaque`);
    return highlights;
  }

  async getProductCategories(): Promise<ICategory[]> {
    console.log(`✅ ${this.categories.length} categorias encontradas`);
    return this.categories;
  }

  //TODO: sistema de recomnedação menos aleatorio
  async recommendProducts(userId: string): Promise<IProduct[]> {
    // Simulação de recomendação baseada em histórico (exemplo simples)
    const recommendations = this.products
      .filter(product => product.quantityInStock > 0)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    console.log(`✅ ${recommendations.length} produtos recomendados para usuário:`, userId);
    return recommendations;
  }

  async getRelatedProducts(productId: string): Promise<IProduct[]> {
    const product = this.products.find(p => p.id === productId);
    
    if (!product) {
      return [];
    }

    const related = this.products
      .filter(p => p.id !== productId && p.category === product.category)
      .slice(0, 3);

    console.log(`✅ ${related.length} produtos relacionados encontrados para:`, productId);
    return related;
  }

  async getNewArrivals(): Promise<IProduct[]> {
    // Produtos mais recentes (exemplo: últimos 30 dias)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const newArrivals = this.products
      .filter(product => new Date(product.createdAt) > thirtyDaysAgo)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    console.log(`✅ ${newArrivals.length} produtos novos encontrados`);
    return newArrivals;
  }
}
