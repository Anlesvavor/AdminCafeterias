import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, Validator} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';

import { Product } from "../../../product.model";
import { ProductService } from "../../../product.service";
import {MatSnackBar} from "@angular/material";
import {CategoriesService} from "../../../categories.service";
import {Category} from "../../../category.model";
import {ProviderService} from "../../../provider.service";
import {Provider} from "../../../provider.model";
import { UnitService } from 'src/app/unit.service';
import { Unit } from 'src/app/unit.model';



@Component({
  selector: 'app-products-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class ProductsCreateComponent implements OnInit {
  createForm : FormGroup;
  categories: any=[];
  providers: any=[];
  units: any=[];

  constructor(private providersService : ProviderService, private categoriesService : CategoriesService, private productService: ProductService, private fb: FormBuilder, private router:Router, private unitService: UnitService) {
    this.createForm = this.fb.group ({
      name: ['', Validators.required],
      unit: ['', Validators],
      category:  ['', Validators.required],
      description:  ['', Validators.required],
      price:  ['', Validators.required],
      provider: ['', Validators]
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
      });

    this.providersService
      .getProviders()
      .subscribe((data : Provider[]) => {
        this.providers = data;
        this.providers = this.providers.data.docs;
        console.log(this.providers);
      });

    this.unitService
      .getUnits()
      .subscribe((data : Unit[]) =>{
        this.units = data;
        this.units = this.units.data.docs;
        console.log(this.units);
      });
  }

  addProduct(name, category, description, price) {
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
    this.productService.addProduct(name, units, category, description, price, provider).subscribe(() => {
      this.router.navigate(['products/list']);
    });
  }

  ngOnInit() {
    this.fetchCategories();
  }

}
