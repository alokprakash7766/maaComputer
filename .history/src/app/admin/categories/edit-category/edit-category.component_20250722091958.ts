import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../services/category/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CloudinaryService } from '../../../services/cloudinary/cloudinary.service';
import { Category } from '../../../shared/models/category/category.model';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  id: any;
  editForm!: FormGroup; // ✅ FormGroup declared
  selectedFile: any;

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private cloudinaryService: CloudinaryService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder // ✅ FormBuilder injected
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.initForm(); // ✅ Form initialized
    this.getSingleCategory();
  }

  initForm() {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      imageUrl: ['']
    });
  }

  getSingleCategory() {
    this.categoryService.getSingleCategory(this.id).subscribe((res: any) => {
      this.editForm.patchValue({
        name: res.name,
        description: res.description,
        imageUrl: res.imageUrl
      });
    }, (err: any) => {
      console.log(err);
    });
  }

  uploadFile(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submit() {
    if (this.editForm.invalid) {
      this.toastr.error("Please fill all required fields");
      return;
    }

    this.spinner.show();

    const updateData: Category = this.editForm.value;

    if (this.selectedFile) {
      this.cloudinaryService.uploadImage(this.selectedFile).subscribe((res: any) => {
        updateData.imageUrl = res.secure_url;
        this.updateCategory(updateData);
      }, (err: any) => {
        this.spinner.hide();
        this.toastr.error("Image upload failed");
        console.log(err);
      });
    } else {
      this.updateCategory(updateData);
    }
  }

  updateCategory(data: Category) {
    this.categoryService.updateCategory(this.id, data).then(() => {
      this.spinner.hide();
      this.toastr.success("Category Updated");
      this.router.navigateByUrl("/admin/category/manage");
    }).catch(err => {
      this.spinner.hide();
      this.toastr.error("Something went wrong");
      console.log(err);
    });
  }
}
