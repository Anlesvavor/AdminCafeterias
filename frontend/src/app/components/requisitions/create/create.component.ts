import { Component, OnInit } from '@angular/core';
import {RequisitionsService} from "../../../requisitions.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
import {Observable} from "rxjs/index";
import {map, startWith} from "rxjs/internal/operators";
import {HttpClient} from "@angular/common/http";

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
  productsByCat: any = [];
  products : any = [];
  productsInCat: any = [];
  unities : any = [];
  dinners : any = [];
  countCategories = 0;

  dinerControl = new FormControl();
  productControl = new FormControl();
  unitiesControl = new FormControl();
  providerControl = new FormControl();



  filteredDinerOptions: Observable<string[]>;
  filteredProductOptions: Observable<string[]>;
  filteredUnitOptions: Observable<string[]>;
  filteredProvider: Observable<string[]>;
  private ordersForm: any;



  constructor(private dinnersService : DinnerService, private unitiesService : UnitService, private productsService : ProductService, private providersService : ProviderService, private categoriesService : CategoriesService, private requisitionService: RequisitionsService, private fb: FormBuilder, private router:Router) {
    this.createForm = this.fb.group({
      diner: this.dinerControl,
      product: this.productControl,
      provider: ''
    });
  }

  fetchData() {
    this.categoriesService
      .getCategories()
      .subscribe((data: Category[]) => {
        this.categories = data;
        this.categories = this.categories.data.docs;

        this.countCategories = this.categories.length;

        for(let i = 0; i < this.countCategories; i++) {
          this.productsByCat.push(
            {
              category : this.categories[i]._name,
              orders : []
            }
            );
          this.productsInCat.push(
            {
              category: this.categories[i]._name,
              productsAvailable: []
            }
            );
          this.productsInCat[i].productsAvailable = this.productsOfCategory(this.categories[i]._name);
        }


        console.log(this.productsByCat);
        console.log(this.productsInCat);
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

  add(i) {
    this.productsByCat[i].orders.push(
      {
        product : "",
        quantity : "",
        unit : {},
        provider : ""
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
    //this.filteredDinerOptions = this.filteredOptions(this.dinerControl, this.dinners);
    this.filteredDinerOptions = this.dinerControl.valueChanges.pipe(startWith(''), map(value => this._filter(value, this.dinners)));
    //this.filteredProductOptions =  this.productsInCat.map(v=> this.productControl.valueChanges.pipe(startWith(''), map(value => this._filter(value, v))));
    this.filteredProductOptions = this.productControl.valueChanges.pipe(startWith(''), map(value => this._filter(value, this.products)));

    console.log("vvvvvvvvvvvvvvv");
    console.log(this.productsInCat);
    console.log("+++++++++++++++");


    console.log("vvvvvvvvvvvvvvv");
    console.log(this.filteredProductOptions);
    console.log("+++++++++++++++");

    console.log("vvvvvvvvvvvvvvv");
    console.log(this.filteredDinerOptions);
    console.log("===============");
    //this.filteredProductOptions = this.productControl.valueChanges.pipe(startWith(''), map(value => this._filter(value, this.products)));
  }

  filteredCategoriesProductsOptions(cageoryId) {
    return this.productControl.valueChanges.pipe(startWith(''), map(value => this._filter(value, this.productsInCat[cageoryId])));
  }
/*
  filteredOptions(control: FormControl,collection: any) {
    return control.valueChanges
                    .pipe(
                      startWith(''),
                      map(value => this._filter(value, collection))
                    );
  }
*/

  fetchProductData(id: string){
    this.productsService
      .getProductById(id)
      .subscribe((data : Product) => {
          return data;
        }
      )
  }

  productsOfCategory(category: string): any {
    return this.productsService
      .getProductByCategory(category)
      .subscribe((data: any[]) => {
        let tmp:any = data;
        return tmp.data;
      });
  }

  private _filter(value: string, collection: any): string[] {
    const filterValue = value.toLowerCase();
    return collection.filter(option =>
      option._name.toLowerCase().includes(filterValue)
    );
  }
}
