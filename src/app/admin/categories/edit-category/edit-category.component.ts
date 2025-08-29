import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../../services/category/category.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CloudinaryService } from '../../../services/cloudinary/cloudinary.service';


@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxSpinnerModule, RouterLink],
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  id: any;
  categoryForm!: FormGroup;
  selectedFile: any;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private cloudinaryService: CloudinaryService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.initForm();
    this.getSingleCategory();
  }

  initForm() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      warranty: [0],
      description: [''],
      imageUrl: ['']
    });
  }

  getSingleCategory() {
    this.categoryService.getSingleCategory(this.id).subscribe(
      (res: any) => {
        this.categoryForm.patchValue(res);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  uploadFile(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitCategory() {
    if (this.categoryForm.invalid) return;

    this.spinner.show();

    const formData = this.categoryForm.value;

    const updateCategoryData = (imageUrl?: string) => {
      if (imageUrl) {
        formData.imageUrl = imageUrl;
      }

      this.categoryService.updateCategory(this.id, formData).then(() => {
        this.spinner.hide();
        this.toastr.success("Category Updated");
        this.router.navigateByUrl("/admin/update/category");
      }).catch(err => {
        this.spinner.hide();
        this.toastr.error("Update failed");
        console.log(err);
      });
    };

    if (this.selectedFile) {
      this.cloudinaryService.uploadImage(this.selectedFile).subscribe(
        (res: any) => updateCategoryData(res.secure_url),
        (err: any) => {
          this.spinner.hide();
          this.toastr.error("Image upload failed");
          console.log(err);
        }
      );
    } else {
      updateCategoryData();
    }
  }
}
