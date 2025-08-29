import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Services } from '../../../shared/models/services/services.model';
import { AddServicesService } from '../../../services/services/services.service';

@Component({
  selector: 'app-all-services',
  imports: [CommonModule, RouterLink],
  templateUrl: './all-services.component.html',
  styleUrl: './all-services.component.css'
})
export class AllServicesComponent  implements OnInit{
      servicesList: Services[] = [];
       constructor(
    private router: Router,
    private serviceService: AddServicesService,
  ) {}
  

}
