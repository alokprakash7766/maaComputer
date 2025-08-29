import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/addProduct/add-product.model';


@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  imports: [] // include CommonModule or NgFor if using *ngFor
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];

  constructor(
    private productService: ProductService,
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
}
