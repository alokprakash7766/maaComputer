import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Timestamp } from '@angular/fire/firestore';
import { AddServicesService } from '../../services/services/services.service';
import { Services } from '../../shared/models/services/services.model';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  servicesList: Services[] = [];
  loading = true;

  constructor(private serviceService: AddServicesService) {}

  ngOnInit(): void {
    this.serviceService.getAllServices().subscribe({
      next: (services) => {
        // Format createdAt if it's Firestore Timestamp
        this.servicesList = services.map(s => {
          if ((s as any).createdAt && (s as any).createdAt.toDate) {
            return {
              ...s,
              createdAt: (s as any).createdAt.toDate()
            };
          }
          return s;
        });
        this.loading = false;
      },
      error: (err) => {
        console.error("Error fetching services:", err);
        this.loading = false;
      }
    });
  }
}
