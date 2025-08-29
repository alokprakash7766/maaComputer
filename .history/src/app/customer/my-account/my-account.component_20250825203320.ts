import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/auth/auth.service';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  user: any = null;
  activeTab: string = 'profile'; // default
  isEditing: boolean = false;    // ✅ edit mode
  editData: any = { name: '', address: '' };

  constructor(
    private authService: AuthService, 
    private router: Router,
    private db: Firestore,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = {
      uid: sessionStorage.getItem("uid"),        // ✅ uid भी चाहिए update के लिए
      name: sessionStorage.getItem("name"),
      email: sessionStorage.getItem("email"),
      phone: sessionStorage.getItem("phone"),
      address: sessionStorage.getItem("address"),
      userType: sessionStorage.getItem("userType"),
      isLogged: sessionStorage.getItem("isLogged"),
      createdAt: sessionStorage.getItem("createdAt")
    };
  }

  get formattedDate(): string {
    return this.user?.createdAt ? new Date(Number(this.user.createdAt)).toLocaleString() : '';
  }

  logout() {
    this.authService.clear();
    this.router.navigateByUrl("/login");
  }

  // ✅ Edit Profile start
  startEdit() {
    this.isEditing = true;
    this.editData = { 
      name: this.user.name, 
      address: this.user.address 
    };
  }

  // ✅ Save profile to Firestore
  async saveProfile() {
    try {
      if (!this.user.uid) {
        this.toastr.error("User UID missing", "Error");
        return;
      }

      const userRef = doc(this.db, "users", this.user.uid);
      await updateDoc(userRef, {
        name: this.editData.name,
        address: this.editData.address
      });

      // sessionStorage update
      sessionStorage.setItem("name", this.editData.name);
      sessionStorage.setItem("address", this.editData.address);

      // user object update
      this.user.name = this.editData.name;
      this.user.address = this.editData.address;

      this.isEditing = false;
      this.toastr.success("Profile updated successfully");
    } catch (err) {
      console.error(err);
      this.toastr.error("Failed to update profile");
    }
  }
}
