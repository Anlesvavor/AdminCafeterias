import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { DeliverService } from "../../../deliver.service";
import { RequisitionsService } from 'src/app/requisitions.service';
import { Requisition } from 'src/app/requsitions.model';
import { Observable } from 'rxjs/index';
import { startWith, map } from 'rxjs/internal/operators';
import { DinnerService } from 'src/app/dinner.service';
import { UnitService } from 'src/app/unit.service';
import { ProductService } from 'src/app/product.service';
import { ProviderService } from 'src/app/provider.service';
import { CategoriesService } from 'src/app/categories.service';
import { Provider } from 'src/app/provider.model';
import { Product } from 'src/app/product.model';
import { Unit } from 'src/app/unit.model';
import { Dinner } from 'src/app/dinner.model';
import { DinnersCreateComponent } from '../../dinners/create/create.component';
@Component({
  selector: 'app-create',
  templateUrl: './createDelivery.component.html',
  styleUrls: ['./createDelivery.component.css']
})
export class CreateDeliveryComponent implements OnInit {
  createForm: FormGroup;
  availableReq: any = [];
  products : any = [];
  productsInOrd: any = [];
  orders: any = []; 
  countReq = 0;
  categories: any=[];
  providers: any = [];
  unities : any = [];
  dinners : any = [];
  diner;
  countCategories = 0;
  date = new Date();

  requisitionControl = new FormControl();
  dinerControl = new FormControl();
  productControl = new FormControl();
  unitsControl = new FormControl();
  providerControl = new FormControl();
  observationsControl = new FormControl();

  filteredDinerOptions: Observable<string[]>;

  constructor(private dinnersService : DinnerService, private unitiesService : UnitService, private productsService : ProductService, private providersService : ProviderService, private categoriesService : CategoriesService, private requisitionService: RequisitionsService, private deliveryService: DeliverService, private fb: FormBuilder, private router:Router) {
    this.createForm = this.fb.group({
      orders: this.requisitionControl
    });
    setInterval(()=>{
      this.date = new Date();
    }, 1000)
  }

  fetchData(){
    this.requisitionService
      .getRequisitions()
      .subscribe((data: Requisition[]) => {
        this.availableReq = data;
        this.availableReq = this.availableReq.data.docs;
        console.log(this.availableReq);
        for(let i = 0; i < this.availableReq.length; i++){
          console.log(this.availableReq._diner);
          if(!this.dinners.includes(this.availableReq[i]._diner)){
            this.dinners.push(this.availableReq[i]._diner);
          }
        }
      });
    this.providersService
      .getProviders()
      .subscribe((data : Provider[]) => {
        this.providers = data;
        this.providers = this.providers.data.docs;
        this.providers.push({"_name":"CEDIS"});
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
  }

  add(i) {
    this.orders.push(
      {
        diner : "",
        requisition : "",
        product : "",
        quantity : "",
        unit : "",
        provider : "",
      }
      );
  }

  remove(i) {
    this.orders.pop();
  }

  addDelivery(name, driver, plateNumber, driverPhoneNumber, capacity) {
    this.deliveryService.addDelivery(name, driver, plateNumber, driverPhoneNumber, capacity).subscribe(() => {
      this.router.navigate(['/delivers/list']);
    });
  }
  ngOnInit() {
    this.fetchData();
    this.filteredDinerOptions = this.dinerControl.valueChanges.pipe(startWith(''), map(value => this._filter(value, this.dinners)));
  }


  private _filter(value: string, collection: any): string[] {
    const filterValue = value.toLowerCase();
    return collection.filter(option =>
      option._name.toLowerCase().includes(filterValue)
    );
  }

  trackByIndex(index: number, value: number) {
    return index;
  }
}
