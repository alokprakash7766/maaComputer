import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../shared/models/category/category.model';
import Swal from 'sweetalert2';
import { CartModel } from '../../shared/models/cart/cart.model';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private cartService: CartService, private router: Router, private toastr: ToastrService) { }

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

addToCart(category: any) {
  const userString = localStorage.getItem('user');

  // 🛑 Step 1: Check if user string exists and is not invalid
  if (!userString || userString === 'null' || userString === 'undefined') {
    this.router.navigate(['/login']);
    return;
  }

  // ✅ Step 2: Parse the user data
  let user: any;
  try {
    user = JSON.parse(userString);
  } catch (e) {
    console.error('Invalid user JSON', e);
    this.router.navigate(['/login']);
    return;
  }

  // ✅ Step 3: Final null check after parsing
  if (!user || !user.uid) {
    this.router.navigate(['/login']);
    return;
  }

  // ✅ If user is valid, proceed to add to cart
  const cartItem: CartModel = {
    productId: category.id,
    name: category.name,
    price: category.price,
    image: category.imageUrl,
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
