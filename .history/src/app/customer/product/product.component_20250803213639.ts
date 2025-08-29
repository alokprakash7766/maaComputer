import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/addProduct/add-product.model';
import { CategoryComponent } from '../category/category.component';


@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  imports: [] // include CommonModule or NgFor if using *ngFor
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  categories: CategoryComponent[] = [];

  constructor(
    private productService: ProductServic,
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
