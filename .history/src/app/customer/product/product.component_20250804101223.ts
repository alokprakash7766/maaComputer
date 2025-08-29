import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/addProduct/add-product.model';
import { CategoryComponent } from '../category/category.component';
import { AddProductService } from '../../services/addProduct/add-product.service';
import { CategoryService } from '../../services/category/category.service';


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
    private categoryService: CategoryService
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


addToCartHandler(product: any) {
  const userString = localStorage.getItem('user');

  if (!userString) {
    Swal.fire({
      icon: 'info',
      title: 'Please login first!',
      showConfirmButton: true
    }).then(() => {
      this.router.navigate(['/login']);
    });
    return;
  }

  let user;
  try {
    user = JSON.parse(userString);
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid session, please login again!'
    }).then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
    return;
  }

  if (!user || !user.uid) {
    this.router.navigate(['/login']);
    return;
  }

  // User is valid → now add to cart
  this.addToCart(product);
}

addToCart(product: any) {
  const cartItem: CartModel = {
    productId: product.id,
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
