import { Component } from '@angular/core';import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

}
