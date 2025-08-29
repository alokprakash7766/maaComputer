import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartService } from '../../services/cart/cart.service';
import { AddProductService } from '../../services/addProduct/add-product.service';
import { ToastrService } from 'ngx-toastr';
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

  // ✅ Payment integration
proceedToPayment(product: any) {
  // user details fetch karna (agar login kiya hai to localStorage se)
  const userStr = localStorage.getItem('user');
  let user: any = { name: "Guest", email: "guest@example.com", mobile: "9999999999" };

  if (userStr) {
    try {
      user = JSON.parse(userStr);
    } catch {}
  }

  const options: any = {
    key: "rzp_test_R7raQKFj1qN71z", // Razorpay key
    amount: product.price * 100,   // paisa me (₹500 -> 50000)
    currency: "INR",
    name: "Maa Computer Press",
    description: product.name,
    prefill: {
      name: user.name || "Customer",
      email: user.email || "customer@example.com",
      contact: user.mobile || "9999999999"
    },
    theme: { color: "#3399cc" },
    handler: (res: any) => {
      this.toastr.success("Payment Successful ✅");
      console.log("Payment Done:", res);
    }
  };

  const rzp1 = new Razorpay(options);

  rzp1.on("payment.failed", (err: any) => {
    this.toastr.error("Payment Failed ❌");
    console.error(err);
  });

  rzp1.open();
}

}
