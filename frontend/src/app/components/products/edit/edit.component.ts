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
  updateForm: FormGroup;

  constructor(private providersService : ProviderService, private categoriesService : CategoriesService, private productService: ProductService, private router:Router, private route:ActivatedRoute, private snackBar: MatSnackBar, private fb:FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      unities: '',
      category:  ['', Validators.required],
      description:  ['', Validators.required],
      price:  ['', Validators.required],
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
  }


  ngOnInit() {
    this.fetchData();
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.productService.getProductById(this.id).subscribe(res => {
        this.product = res;
        this.updateForm.get('name').setValue(this.product.name);
        this.updateForm.get('unities').setValue(this.product.untiies);
        this.updateForm.get('category').setValue(this.product.category);
        this.updateForm.get('description').setValue(this.product.description);
        this.updateForm.get('price').setValue(this.product.price);
        this.updateForm.get('provider').setValue(this.product.provider);
      });
    });
  }

  updateProduct(name, unities, category, description, price, provider) {
    this.productService.updateProduct(this.id, name, unities, category, description, price, provider).subscribe(() => {
      this.router.navigate([`/products/list`]);
    });
  }
}
