import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  userData: any = null;   // Firebase से आने वाला data store करने के लिए

  constructor(private firestore: Firestore) {}

  async ngOnInit() {
    // 🔹 मान लो तुम current user का uid जानते हो
    const uid = "5FKl9D2HawVQUpMtWQI7NDQQLay1";

    const userRef = doc(this.firestore, `users/${uid}`);
    const snap = await getDoc(userRef);

    if (snap.exists()) {
      this.userData = snap.data();
      console.log("User Data:", this.userData);
    } else {
      console.log("No user found!");
    }
  }
}
