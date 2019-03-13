import { Component, OnInit } from '@angular/core';
import {RequisitionsService} from "../../../requisitions.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../../../category.model";
import {Router} from "@angular/router";
import {CategoriesService} from "../../../categories.service";
import {Order} from "../../../order.model";
import {ProviderService} from "../../../provider.service";
import {Provider} from "../../../provider.model";
import {ProductService} from "../../../product.service";
import {Product} from "../../../product.model";
import {UnitService} from "../../../unit.service";
import {Unit} from "../../../unit.model";
import {DinnerService} from "../../../dinner.service";
import {Dinner} from "../../../dinner.model";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class RequisitionsCreateComponent implements OnInit {
  createForm : FormGroup;
  categories: any=[];
  providers: any = [];
  orders : any = [];
  products : any = [];
  unities : any = [];
  dinners : any = [];

  constructor(private dinnersService : DinnerService, private unitiesService : UnitService, private productsService : ProductService, private providersService : ProviderService, private categoriesService : CategoriesService, private requisitionService: RequisitionsService, private fb: FormBuilder, private router:Router) {
    this.createForm = this.fb.group({
      diner: '',
      provider: ''
    });
  }

  fetchData() {
    this.categoriesService
      .getCategories()
      .subscribe((data: Category[]) => {
        this.categories = data;
        this.categories = this.categories.data.docs;
        console.log('Data requested ...');
        console.log(this.categories);
      });
    this.providersService
      .getProviders()
      .subscribe((data : Provider[]) => {
        this.providers = data;
        this.providers = this.providers.data.docs;
      });
    this.productsService
      .getProducts()
      .subscribe((data: Product[]) => {
        this.products = data;
        this.products = this.products.data.docs;
      });
    this.unitiesService
      .getUnits()
      .subscribe((data: Unit[]) => {
        this.unities = data;
        this.unities = this.unities.data.docs;
      });
    this.dinnersService
      .getDinners()
      .subscribe((data: Dinner[]) => {
        this.dinners = data;
        this.dinners = this.dinners.data.docs;
      });
  }

  add() {
    this.orders.push(
      {
        "product" : {},
        "quantity" : "",
        "unit" : {},
        "provider" : ""
      }
      );
    console.log(this.orders);
  }

  addRequisition(diner) {
    this.requisitionService.addRequisition(diner, this.orders).subscribe(() => {
      this.router.navigate(['requisitions/list']);
    });
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchProductData(value: string) {

  }
}
