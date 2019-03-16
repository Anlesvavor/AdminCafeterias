import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";

import {RequisitionsService} from "../../../requisitions.service";
import {Requisition} from "../../../requsitions.model";
import {Product} from "../../../product.model";
import {Dinner} from "../../../dinner.model";
import {Category} from "../../../category.model";
import {Provider} from "../../../provider.model";
import {Unit} from "../../../unit.model";
import {Observable} from "rxjs/index";
import {ProductService} from "../../../product.service";
import {UnitService} from "../../../unit.service";
import {DinnerService} from "../../../dinner.service";
import {CategoriesService} from "../../../categories.service";
import {ProviderService} from "../../../provider.service";
import {map, startWith} from "rxjs/internal/operators";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class RequisitionsEditComponent implements OnInit {

  id : string;
  requisition: Requisition;


  categories: any=[];
  providers: any = [];
  orders : any = [];
  productsByCat: any = [];
  products : any = [];
  productsInCat: any = [];
  unities : any = [];
  dinners : any = [];
  countCategories = 0;
  date = new Date();


  dinerControl = new FormControl(Validators.required);
  productControl = new FormControl(Validators.required);
  unitsControl = new FormControl(Validators.required);
  providerControl = new FormControl(Validators.required);
  observationsControl = new FormControl();


  filteredDinerOptions: Observable<string[]>;
  filteredProductOptions: Observable<string[]>;
  filteredUnitOptions: Observable<string[]>;
  filteredProviderOptions: Observable<string[]>;
  private ordersForm: any;
  observations: string;
  private updateForm: FormGroup;



  constructor(private requisitionsService : RequisitionsService, private dinnersService : DinnerService, private unitiesService : UnitService, private productsService : ProductService, private providersService : ProviderService, private categoriesService : CategoriesService, private requisitionService: RequisitionsService, private fb: FormBuilder, private router:Router, private route:ActivatedRoute) {

    setInterval(()=>{
      this.date = new Date();
    }, 60000)
  }

  ngOnInit() {
    this.fetchData();
    this.updateForm = this.fb.group({
      diner: this.dinerControl,
      product: this.productControl,
      unities: this.unitsControl,
      provider: this.providerControl,
      observations: this.observationsControl
    });
    this.filteredDinerOptions = this.dinerControl.valueChanges.pipe(startWith(''), map(value => this._filter(value, this.dinners)));
    this.filteredProductOptions = this.productControl.valueChanges.pipe(startWith(''), map(value => this._filter(value, this.products)));
    this.filteredUnitOptions = this.unitsControl.valueChanges.pipe(startWith(''), map(value => this._filter(value, this.unities)));
    this.filteredProviderOptions = this.providerControl.valueChanges.pipe(startWith(''), map(value => this._filter(value, this.providers)));
  }

  fetchData() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.requisitionsService
        .getRequisitionById(this.id)
        .subscribe((res:any) => {
          this.requisition = res.data;
          this.requisition.requisitionOrig = JSON.parse(JSON.stringify(this.requisition));
        });
    });
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
        unit : "",
        provider : ""
      }
    );
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

  updateRequisition() {

    this.requisitionsService.updateRequisition(this.id, this.requisition ).subscribe(() => {
      this.router.navigate([`/requisitions/list`]);
    });
  }

  setStatus(s: string) {
    this.requisition.status = s;
  }
}
