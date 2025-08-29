import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';  // ✅ FormBuilder used
import { Firestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../../shared/models/category/category.model';
import { CategoryService } from '../../../services/category/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CloudinaryService } from '../../../services/cloudinary/cloudinary.service';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  id: any;
  Category: Category = {};
  selectedFile: any;

  // ✅ Declare form
  editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,   // ✅ Inject FormBuilder
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private cloudinaryService: CloudinaryService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.getSingleCategory();

    // ✅ Initialize the form
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      imageUrl: ['']
    });
  }

  getSingleCategory() {
    this.categoryService.getSingleCategory(this.id).subscribe(
      (res: any) => {
        this.Category = res;

        // ✅ Patch values to form
        this.editForm.patchValue({
          name: res.name || '',
          description: res.description || '',
          imageUrl: res.imageUrl || ''
        });
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  uploadFile(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submit() {
    this.spinner.show();

    // ✅ Get updated data from form
    const updatedCategory = this.editForm.value;

    if (this.selectedFile) {
      this.cloudinaryService.uploadImage(this.selectedFile).subscribe(
        (res: any) => {
          updatedCategory.imageUrl = res.secure_url;

          this.categoryService.updateCategory(this.id, updatedCategory).then(() => {
            this.spinner.hide();
            this.toastr.success("Category Updated");
            this.router.navigateByUrl("/admin/category/manage");
          }, (err: any) => {
            this.spinner.hide();
            this.toastr.error("Something went wrong");
            console.log(err);
          });
        },
        (err: any) => {
          this.spinner.hide();
          this.toastr.error("Something went wrong");
          console.log(err);
        }
      );
    } else {
      this.categoryService.updateCategory(this.id, updatedCategory).then(() => {
        this.spinner.hide();
        this.toastr.success("Category Updated");
        this.router.navigateByUrl("/admin/category/manage");
      }, (err: any) => {
        this.spinner.hide();
        this.toastr.error("Something went wrong");
        console.log(err);
      });
    }
  }
}
