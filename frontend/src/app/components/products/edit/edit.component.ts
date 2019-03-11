import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";

import { ProductService } from "../../../product.service";
import { Product } from "../../../product.model";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-products-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class ProductsEditComponent implements OnInit {

  id: String;
  product: any = {};
  updateForm: FormGroup;

  constructor(private productService: ProductService, private router:Router, private route:ActivatedRoute, private snackBar: MatSnackBar, private fb:FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      unities: '',
      category:  ['', Validators.required],
      description:  ['', Validators.required],
      price:  ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.productService.getProductById(this.id).subscribe(res => {
        this.product = res;
        this.updateForm.get('name').setValue(this.product.name);
        this.updateForm.get('unities').setValue(this.product.untiies);
        this.updateForm.get('category').setValue(this.product.category);
        this.updateForm.get('description').setValue(this.product.description);
        this.updateForm.get('price').setValue(this.product.price);

      });
    });
  }

  updateProduct(name, unities, category, description, price) {
    this.productService.updateProduct(this.id, name, unities, category, description, price).subscribe(() => {
      this.router.navigate([`/products/list`]);
    });
  }
}
