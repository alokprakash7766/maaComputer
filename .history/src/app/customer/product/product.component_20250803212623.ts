import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgFor } from '@angular/common';
import { AddProductService } from '../../services/addProduct/add-product.service';
import { Product } from '../../shared/models/addProduct/add-product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'] // optional
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  constructor(private addProductService: AddProductService) {}

  ngOnInit(): void {
    this.addProductService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
