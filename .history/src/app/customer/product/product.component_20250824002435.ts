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
  proceedToPayment(bill: any) {
    var options = {
      "key": "rzp_test_R7raQKFj1qN71z", // Enter the Key ID generated from the Dashboard
      "amount": 50000, // Amount is in currency subunits.
      "currency": "INR",
      "name": "Maa Computer Press", //your business name
      "description": "Test Transaction",
      //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      // "handler": function (response) {
      //   alert(response.razorpay_payment_id);
      //   alert(response.razorpay_order_id);
      //   alert(response.razorpay_signature)
      // },
      "prefill": {
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "+919876543210"  //Provide the customer's phone number for better conversion rates 
      },
      "theme": {
        "color": "#3399cc"
      },
      handler: ((res: any) => {
        this.toastr.success("Payment Successfull")
        console.log("payment Done");
      })
    };
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', (any: any) => {
      this.toastr.error("Payment Failed")
    });
    rzp1.open();
  }
}
