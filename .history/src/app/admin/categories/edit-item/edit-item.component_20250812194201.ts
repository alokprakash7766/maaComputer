import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../services/category/category.service';


@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html'
})
export class EditItemComponent implements OnInit {
  type!: string;
  id!: string;

  category: any = {};
  product: any = {};
  service: any = {};

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private serviceService: serviceService
  ) {}

  ngOnInit() {
    this.type = this.route.snapshot.paramMap.get('type')!;
    this.id = this.route.snapshot.paramMap.get('id')!;

    if (this.type === 'category') {
      this.categoryService.getCategoryById(this.id).subscribe(data => this.category = data);
    } 
    else if (this.type === 'product') {
      this.productService.getProductById(this.id).subscribe(data => this.product = data);
    } 
    else if (this.type === 'service') {
      this.serviceService.getServiceById(this.id).subscribe(data => this.service = data);
    }
  }

  updateCategory() {
    this.categoryService.updateCategory(this.id, this.category).then(() => alert('Category updated'));
  }

  updateProduct() {
    this.productService.updateProduct(this.id, this.product).then(() => alert('Product updated'));
  }

  updateService() {
    this.serviceService.updateService(this.id, this.service).then(() => alert('Service updated'));
  }
}
