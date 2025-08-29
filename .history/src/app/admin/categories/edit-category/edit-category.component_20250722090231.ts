import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
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
export class EditCategoryComponent implements OnInit{

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
}
