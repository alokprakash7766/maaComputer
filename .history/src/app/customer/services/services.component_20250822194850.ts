import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AddServicesService } from '../../services/services/services.service';
import { Services } from '../../shared/models/services/services.model';
import { CartModel } from '../../shared/models/cart/cart.model';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  servicesList: Services[] = [];
  loading = true;

  constructor(
    private serviceService: AddServicesService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.serviceService.getAllServices().subscribe({
      next: (services) => {
        this.servicesList = services.map(s => {
          if ((s as any).createdAt && (s as any).createdAt.toDate) {
            return {
              ...s,
              createdAt: (s as any).createdAt.toDate()
            };
          }
          return s;
        });
        this.loading = false;
      },
      error: (err) => {
        console.error("Error fetching services:", err);
        this.loading = false;
      }
    });
  }

  addToCart(service: any) {
  const cartItem: CartModel = {
    productId: service.id!,
    name: service.name,
    price: service.price,
    image: service.imageUrl ?? 'assets/img/default-image.png',
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
