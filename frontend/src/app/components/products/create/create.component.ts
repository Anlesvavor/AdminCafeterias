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



@Component({
  selector: 'app-products-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class ProductsCreateComponent implements OnInit {
  createForm : FormGroup;
  categories: any=[];
  providers: any=[];

  constructor(private providersService : ProviderService, private categoriesService : CategoriesService, private productService: ProductService, private fb: FormBuilder, private router:Router) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      unities: ['', Validators.required],
      category:  ['', Validators.required],
      description:  ['', Validators.required],
      price:  ['', Validators.required],
      provider: ['', Validators.required]
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
      });
  }

  addProduct(name, unities, category, description, price, provider) {
    this.productService.addProduct(name, unities, category, description, price, provider).subscribe(() => {
      this.router.navigate(['products/list']);
    });
  }

  ngOnInit() {
    this.fetchCategories();
  }

}
