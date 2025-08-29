import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartService } from '../../services/cart/cart.service';
import { AddProductService } from '../../services/addProduct/add-product.service';
declare var Razorpay: any;   // 👈 Razorpay declare karna zaroori hai


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: any[] = [];

  constructor(
    private productService: AddProductService,
    private cartService: CartService,
    private router: Router,
      private toastr: ToastrService
      
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe((res: any[]) => {
      this.products = res;
    });
  }

  addToCartHandler(product: any) {
    const userStr = localStorage.getItem('user');

    if (!userStr) {
      Swal.fire({
        icon: 'info',
        title: 'Please login first!',
        showConfirmButton: true
      }).then(() => {
        this.router.navigate(['/login']);
      });
      return;
    }

    let user: any;

    try {
      user = JSON.parse(userStr);
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
      Swal.fire({
        icon: 'warning',
        title: 'Session expired!',
        text: 'Please login again.'
      }).then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      });
      return;
    }

    // ✅ All good – Add product to cart
    this.cartService.addToCart({
      ...product,
      uid: user.uid,
      quantity: 1
    }).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Added to cart'
      });
    }).catch(() => {
      Swal.fire({
        icon: 'error',
        title: 'Failed to add to cart'
      });
    });
  }
}
