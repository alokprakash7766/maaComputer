import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-services',
  imports: [CommonModule, RouterLink],
  templateUrl: './all-services.component.html',
  styleUrl: './all-services.component.css'
})
export class AllServicesComponent {

}
