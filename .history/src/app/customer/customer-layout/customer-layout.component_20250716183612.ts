import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerFooterComponent } from './customer-footer/customer-footer.component';

@Component({
  selector: 'app-customer-layout',
  imports: [RouterModule,CustomerFooterComponent, custom ],
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.css'
})
export class CustomerLayoutComponent {

}
