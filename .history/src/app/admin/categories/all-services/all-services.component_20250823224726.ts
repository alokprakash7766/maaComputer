import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-services',
  imports: [CommonModule, RouterLink],
  templateUrl: './all-services.component.html',
  styleUrl: './all-services.component.css'
})
export class AllServicesComponent  implements OnInit{
      servicesList: Services[] = [];
       constructor(
    private categoryService: CategoryService,
    private router: Router,
    private productService: AddProductService,
    private serviceService: AddServicesService,
     private weddingCardService: WeddingCardService
  ) {}

}
