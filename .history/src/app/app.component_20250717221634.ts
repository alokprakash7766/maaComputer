import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
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


