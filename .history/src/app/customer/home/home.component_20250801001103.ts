import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../shared/models/category/category.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

 


  // addToCart(product: any) {
  //   this.cartService.addToCart(product).then(() => {
  //     this.router.navigate(['/cart']);
  //   });
  // }


  categories: Category[] = [];

    constructor(private categoryService: CategoryService,private cartService: CartService, private router: Router) { }

    ngOnInit(): void {
      this.categoryService.getAllCategories().subscribe({
        next: (data) => {
          this.categories = data;
        },
        error: (err) => {
          console.error('Error fetching categories:', err);
        }
      });
    }

    onEdit(id: string) {

      this.router.navigate(['/admin/edit-category/:id', id]);
    }

    deleteCategory(id: any) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.categoryService.deleteCategory(id).then((res: any) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          },
            (err: any) => {
              console.log(err);
            }
          )
        }
      });
    }
    addToCart(product: any) {
    this.cartService
      .addToCart(product)
      .then(() => {
        console.log('Item added to cart');
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
      });
  }
}
