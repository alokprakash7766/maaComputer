import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, addDoc, collection, serverTimestamp } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-service-appointment',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './service-appointment.component.html',
  styleUrl: './service-appointment.component.css'
})
export class ServiceAppointmentComponent implements OnInit {
  serviceId: string | null = null;
  loading = false;

  appointment: any = {
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    date: '',
    time: '',
    modelName: '',
    notes: '',
    reminder: true,
    serviceId: ''
  };

  constructor(private route: ActivatedRoute, private firestore: Firestore) {}

  ngOnInit(): void {
    this.serviceId = this.route.snapshot.paramMap.get('id');
    if (this.serviceId) {
      this.appointment.serviceId = this.serviceId;
    }
  }

  // Open Bootstrap modal
  openConfirmModal() {
    const modal = new (window as any).bootstrap.Modal(document.getElementById('confirmModal'));
    modal.show();
  }

  // Save to Firestore
  async confirmBooking() {
    this.loading = true;
    try {
      const appointmentsRef = collection(this.firestore, 'appointments');
      await addDoc(appointmentsRef, {
        ...this.appointment,
        createdAt: serverTimestamp()
      });

      this.loading = false;
      Swal.fire('Success!', 'Your appointment has been booked.', 'success');

      // Reset form after success
      this.appointment = {
        name: '',
        email: '',
        phone: '',
        serviceType: '',
        date: '',
        time: '',
        modelName: '',
        notes: '',
        reminder: true,
        serviceId: this.serviceId
      };

      const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('confirmModal'));
      modal.hide();

    } catch (err) {
      this.loading = false;
      Swal.fire('Error!', 'Failed to book appointment.', 'error');
      console.error(err);
    }
  }
}
