import { Injectable } from '@angular/core';

export interface Product {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AddProductService {
  private products: Product[] = [];

  constructor() {}

  addProduct(product: Product) {
    this.products.push(product);
    console.log('📦 Product List:', this.products);
  }

  getProducts(): Product[] {
    return this.products;
  }
}
