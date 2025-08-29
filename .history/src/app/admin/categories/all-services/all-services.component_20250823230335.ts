import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Services } from '../../../shared/models/services/services.model';
import { AddServicesService } from '../../../services/services/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-services',
  imports: [CommonModule],
  templateUrl: './all-services.component.html',
  styleUrl: './all-services.component.css'
})
export class AllServicesComponent  implements OnInit{
      servicesList: Services[] = [];
        loading = true;
        
       constructor(
    private router: Router,
    private serviceService: AddServicesService,
  ) {}
   ngOnInit(): void {
   

    // Load services
    this.serviceService.getAllServices().subscribe({
      next: (data) => {
        this.servicesList = data;
                this.loading = false;
                
      },
      error: (err) => {
        console.error('Error fetching services:', err);
                this.loading = false;
                
      }
    });
  }
// ------------------ Services ------------------
  editService(id?: string) {
    if (!id) return;
    this.router.navigate(['/admin/edit-service', id]);
  }

  deleteService(id?: string) {
    if (!id) return;
    Swal.fire({
      title: 'Are you sure?',
      text: 'This service will be permanently deleted!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceService.deleteService(id).then(() => {
          Swal.fire('Deleted!', 'Service has been deleted.', 'success');
        }).catch((err) => {
          console.error(err);
          Swal.fire('Error!', 'Failed to delete service.', 'error');
        });
      }
    });
  }
  
}
