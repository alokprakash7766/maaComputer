import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Contact } from '../../shared/models/contact/contact.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  async submitForm() {
    if (this.contactForm.valid) {
      const data: Contact = this.contactForm.value;
      const contactRef = collection(this.firestore, 'contacts');

      try {
        await addDoc(contactRef, data);

        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'We have received your message successfully.',
          confirmButtonColor: '#3085d6'
        });

        this.contactForm.reset();
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong while submitting. Please try again.',
          confirmButtonColor: '#d33'
        });
        console.error(err);
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please fill in all required fields.',
        confirmButtonColor: '#f39c12'
      });
    }
  }
}
