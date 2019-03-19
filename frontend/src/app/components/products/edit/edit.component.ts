import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";

import { ProductService } from "../../../product.service";
import { Product } from "../../../product.model";
import {MatSnackBar} from "@angular/material";
import {Category} from "../../../category.model";
import {Provider} from "../../../provider.model";
import {CategoriesService} from "../../../categories.service";
import {ProviderService} from "../../../provider.service";
import { UnitService } from 'src/app/unit.service';
import { Unit } from '../../../unit.model';

@Component({
  selector: 'app-products-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class ProductsEditComponent implements OnInit {

  id: String;
  product: any = {};
  providers: any = [];
  categories: any = [];
  units: any = [];
  updateForm: FormGroup;

  constructor(private providersService : ProviderService, private categoriesService : CategoriesService, private unitService: UnitService, private productService: ProductService, private router:Router, private route:ActivatedRoute, private snackBar: MatSnackBar, private fb:FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      units: ['', Validators],
      category:  ['', Validators.required],
      description:  ['', Validators.required],
      price:  ['', Validators.required],
      provider: ['', Validators]
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

      this.unitService
      .getUnits()
      .subscribe((data : Unit[]) =>{
        this.units = data;
        this.units = this.units.data.docs;
      });
  }


  ngOnInit() {
    if (parseInt(localStorage.getItem('role-value')) < 3)
      this.router.navigate(['/dashboard']);
    this.fetchData();
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.productService.getProductById(this.id).subscribe(res => {
        this.product = res;
        this.updateForm.get('name').setValue(this.product.data._name);
        this.updateForm.get('category').setValue(this.product.data._category);
        this.updateForm.get('description').setValue(this.product.data._description);
        this.updateForm.get('price').setValue(this.product.data._price);
        this.updateForm.get('units').setValue(this.product.data._unities.forEach(un => {
          let input_obj = document.getElementsByTagName('input');
            for (let i = 0; i < input_obj.length; i++) {
              if (input_obj[i].type === 'checkbox' && input_obj[i].value === un && input_obj[i].name === 'unit') {
                input_obj[i].checked=true;
              }
            }
        }));
        this.updateForm.get('provider').setValue(this.product.data._provider.forEach(prov => {
          let input_obj = document.getElementsByTagName('input');
            for (let i = 0; i < input_obj.length; i++) {
              if (input_obj[i].type === 'checkbox' && input_obj[i].value === prov && input_obj[i].name === 'provider') {
                input_obj[i].checked=true;
              }
            }
        }));
      });
    });
  }

  updateProduct(name, category, description, price) {
    let units: any=[];
    let input_obj = document.getElementsByTagName('input');
    for (let i = 0; i < input_obj.length; i++) {
      // if input object is checkbox and checkbox is checked then ...
      if (input_obj[i].type === 'checkbox' && input_obj[i].checked === true && input_obj[i].name === 'unit') {
          // ... increase counter and concatenate checkbox value to the url string
          units.push(input_obj[i].value);
      }
    }
    let provider: any=[];
    for (let i = 0; i < input_obj.length; i++) {
      // if input object is checkbox and checkbox is checked then ...
      if (input_obj[i].type === 'checkbox' && input_obj[i].checked === true && input_obj[i].name === 'provider') {
          // ... increase counter and concatenate checkbox value to the url string
          provider.push(input_obj[i].value);
      }
    }

    this.productService.updateProduct(this.id, name, units, category, description, price, provider).subscribe(() => {
      this.router.navigate([`/products/list`]);
    });
  }
}
