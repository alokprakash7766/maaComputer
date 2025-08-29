import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: true,          // Add this if you're using standalone components
  imports: [],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']   // ✅ Fixed
})
export class ServicesComponent { }
