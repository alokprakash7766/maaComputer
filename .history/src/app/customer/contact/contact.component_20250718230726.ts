import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Contact } from '../../shared/models/';


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
      alert('Message submitted successfully!');
      this.contactForm.reset();
    } catch (err) {
      alert('Error while submitting. Please try again.');
      console.error(err);
    }
  } else {
    alert('Please fill in all required fields.');
  }
}
}
