import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/addProduct/add-product.model';
import { CategoryComponent } from '../category/category.component';
import { AddProductService } from '../../services/addProduct/add-product.service';
import { CategoryService } from '../../services/category/category.service';
import { CartService } from '../../services/cart/cart.service'; // ✅ Import CartService
import { Router } from '@angular/router'; // ✅ Import Router
import Swal from 'sweetalert2'; // ✅ Import Swal
import { CartModel } from '../../shared/models/cart/cart.model'; // ✅ Import CartModel

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  imports: [] 
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  categories: CategoryComponent[] = [];

  constructor(
    private productService: AddProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
    });

    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    });
  }

  getProductsByCategory(categoryId: string): Product[] {
    return this.products.filter(p => p.categoryId === categoryId);
  }
  
  addToCart(product: Product) {
  const cartItem: CartModel = {
    productId: product.id!,
    name: product.name,
    price: product.price,
    image: product.imageUrl,
    quantity: 1
  };

  this.cartService.addToCart(cartItem)
    .then(() => {
      Swal.fire({
        title: 'Added to cart!',
        text: 'Go to cart?',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/cart']);
        }
      });
    })
    .catch(err => {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add item to cart.',
        icon: 'error'
      });
      console.error(err);
    });
}

}
