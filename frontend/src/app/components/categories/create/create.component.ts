import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../../user.service";
import {CategoriesService} from "../../../categories.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CategoriesCreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private categoriesService: CategoriesService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      name: ['', Validators.required]

    });
  }

  addCategory(name) {
    console.log("tssss");
    console.log(name);
    this.categoriesService.addCategory(name).subscribe(() => {
      this.router.navigate(['categories/list']);
    });
  }

  ngOnInit() {
  }
}
