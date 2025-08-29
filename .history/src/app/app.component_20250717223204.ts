import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true, // ✅ REQUIRED
  imports: [CommonModule, RouterOutlet, NgxSpinnerModule], // ✅ Add NgxSpinnerModule here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ✅ should be plural: style**Urls**
})
export class AppComponent {
  title = 'projectApp';

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 3000); // hide after 3s
  }
}
