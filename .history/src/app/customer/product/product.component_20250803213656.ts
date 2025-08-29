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
  imports: [] // include CommonModule or NgFor if using *ngFor
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
}
