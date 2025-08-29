import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerFooterComponent } from './customer-footer/customer-footer.component';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';

@Component({
  selector: 'app-customer-layout',
  imports: [RouterModule, CustomerFooterComponent, CustomerHeaderComponent,Cust],
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.css'
})
export class CustomerLayoutComponent {

}
