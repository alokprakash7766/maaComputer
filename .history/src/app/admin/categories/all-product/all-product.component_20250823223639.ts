import { Component } from '@angular/core';

@Component({
  selector: 'app-all-product',
  imports: [],
  templateUrl: './all-product.component.html',
  styleUrl: './all-product.component.css'
})
export class AllProductComponent implements OnInit{
      
       categories: Category[] = [];
  products: Product[] = [];
  servicesList: Services[] = [];
   weddingCardsList: WeddingCard[] = [];
  loading = true;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private productService: AddProductService,
    private serviceService: AddServicesService,
     private weddingCardService: WeddingCardService
  ) {}
  
       ngOnInit(): void {
             
    // Load products
    this.productService.getAllProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error fetching products:', err)
    });
  }
      
}
