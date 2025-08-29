import { Component } from '@angular/core';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';

@Component({
  selector: 'app-admin-layout',
  imports: [AdminHeaderComponent,AdminFooterComponent,RouterM],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
