import { Component } from '@angular/core';
import { BillingService } from '../../services/billing/billing.service';
import { Billing } from '../../shared/models/billing/billing.model';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-billings',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor],
  templateUrl: './billings.component.html',
  styleUrls: ['./billings.component.css']
})
export class BillingsComponent {
  billings: Billing[] = [];

  constructor(private billingService: BillingService) {
    this.billingService.getAllBillings().subscribe(data => {
      this.billings = data;
    });
  }
}
