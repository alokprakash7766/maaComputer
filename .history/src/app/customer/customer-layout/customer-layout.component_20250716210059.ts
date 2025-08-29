import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerFooterComponent } from './customer-footer/customer-footer.component';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';
import { HomeComponent } from '../home/home.component';
import { ShopComponent } from '../shop/shop.component';

@Component({
  selector: 'app-customer-layout',
  imports: [RouterModule, CustomerFooterComponent, CustomerHeaderComponent, HomeComponent,ShopComponent,shop],
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.css'
})
export class CustomerLayoutComponent {

}
