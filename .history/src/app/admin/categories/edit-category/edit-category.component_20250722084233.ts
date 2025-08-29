import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
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
export class UpdateCategoryComponent implements OnInit {



  id: any


  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private cloudinaryService: CloudinaryService,
    private activatedRoute: ActivatedRoute
  ) {
  }


  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id")

    this.getSingleCategory()

  }




  getSingleCategory() {
    this.categoryService.getSingleCategory(this.id).subscribe((res: any) => {
      this.Category = res
    },
      (err: any) => {
        console.log(err);
      }
    )

  }

  Category: Category = {}


  selectedFile: any


  uploadFile(event: any) {
    this.selectedFile = event.target.files[0]
  }

  submit() {
    this.spinner.show()
    if (this.selectedFile) {
      this.cloudinaryService.uploadImage(this.selectedFile).subscribe((res: any) => {
        this.Category.imageUrl = res.secure_url
        this.categoryService.updateCategory(this.id, this.Category).then((res: any) => {
          this.spinner.hide()
          this.toastr.success("Category Updated")
          this.router.navigateByUrl("/admin/category/manage")
        }, ((err: any) => {
          this.spinner.hide()
          this.toastr.error("Something went wrong")
          console.log(err);
        })
        )
      },
        (err: any) => {
          this.spinner.hide()
          this.toastr.error("Something went wrong")
          console.log(err);

        }
      )
    } else {
      this.spinner.show()
      this.categoryService.updateCategory(this.id, this.Category).then((res: any) => {
        this.spinner.hide()
        this.toastr.success("Category Updated")
        this.router.navigateByUrl("/admin/category/manage")
      }, (err: any) => {
        console.log(err);
      })
    }
  }

}

