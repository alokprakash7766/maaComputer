import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerFooterComponent } from './customer-footer/customer-footer.component';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';
import { HomeComponent } from '../home/home.component';
import { ShopComponent } from '../shop/shop.component';
import { ShopDetailsComponent } from '../shop-details/shop-details.component';
import { CartComponent } from '../cart/cart.component';
import { ContactComponent } from '../contact/contact.component';
import { BillingsComponent } from '../billings/billings.component';
import { TestimonialComponent } from '../testimonial/testimonial.component';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-customer-layout',
  imports: [RouterModule, CustomerFooterComponent, CustomerHeaderComponent, HomeComponent,ShopComponent,ShopDetailsComponent,CartComponent,ContactComponent
    ,BillingsComponent, TestimonialComponent,ErrorComponent
  ],
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.css'
})
export class CustomerLayoutComponent {
  constructor(
          private spinner: NgxSpinnerService
  
    ){}

}
