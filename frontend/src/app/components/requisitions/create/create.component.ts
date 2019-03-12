import { Component, OnInit } from '@angular/core';
import {RequisitionsService} from "../../../requisitions.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../category.model";
import {Router} from "@angular/router";
import {CategoriesService} from "../../../categories.service";
import {Order} from "../../../order.model";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class RequisitionsCreateComponent implements OnInit {
  createForm : FormGroup;
  categories: any=[];
  orders : any = [];

  constructor(private categoriesService : CategoriesService, private requisitionService: RequisitionsService, private fb: FormBuilder, private router:Router) {
    this.createForm = this.fb.group({
      diner: ['', Validators.required],
      orders:  ['', Validators.required]
    });
  }

  fetchCategories() {
    this.categoriesService
      .getCategories()
      .subscribe((data: Category[]) => {
        this.categories = data;
        this.categories = this.categories.data.docs;
        console.log('Data requested ...');
        console.log(this.categories);
      })
  }

  add() {
    this.orders.push(
      {
        "product" : "",
        "quantity" : "",
        "unit" : "",
        "provider" : ""
      }
      );
    console.log(this.orders);
  }

  addRequisition(diner, orders) {
    this.requisitionService.addRequisition(diner, orders).subscribe(() => {
      this.router.navigate(['requisitions/list']);
    });
  }

  ngOnInit() {
    this.fetchCategories();
  }

}
