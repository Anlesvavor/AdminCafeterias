import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoriesService} from "../../../categories.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class CategoriesEditComponent implements OnInit {

  id: String;
  category: any = {};
  updateForm: FormGroup;

  constructor(private categoriesService: CategoriesService, private router:Router, private route:ActivatedRoute, private snackBar: MatSnackBar, private fb:FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.categoriesService.getCategoryById(this.id).subscribe(res => {
        this.category = res;
        this.updateForm.get('name').setValue(this.category.name);
      });
    });
  }

  updateCategory(name) {
    this.categoriesService.updateCategory(this.id, name).subscribe(() => {
      this.router.navigate([`/categories/list`]);
    });
  }
}
