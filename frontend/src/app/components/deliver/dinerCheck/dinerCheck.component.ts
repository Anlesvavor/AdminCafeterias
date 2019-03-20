import { Component, OnInit } from '@angular/core';
import {Provider} from "../../../provider.model";
import {Router} from "@angular/router";
import {ProviderService} from "../../../provider.service";
import {DeliverService} from "../../../deliver.service";
import {Deliver} from "../../../deliver.model";
import {Product} from "../../../product.model";
import {ProductService} from "../../../product.service";
import {map, startWith} from "rxjs/internal/operators";
import {Observable} from "rxjs/index";
import {FormControl, Validators} from "@angular/forms";
import {Unit} from "../../../unit.model";
import {UnitService} from "../../../unit.service";

@Component({
  selector: 'app-diner-check',
  templateUrl: './dinerCheck.component.html',
  styleUrls: ['./dinerCheck.component.css']
})
export class DinerCheckComponent implements OnInit {

  delivers: any = [];
  products: any = [];
  unities: any = [];

  date: Date;

  filteredProductOptions: Observable<string[]>;
  filteredUnitOptions: Observable<string[]>;
  productControl = new FormControl(Validators.required);
  unitsControl = new FormControl(Validators.required);

  constructor(private unitiesService : UnitService, private productsService : ProductService, private deliverService: DeliverService, private router: Router) {
    setInterval(()=>{
      this.date = new Date();
    }, 60000)
  }

  ngOnInit() {
    this.deliverService.getDelivers().subscribe(delivers => {
      this.delivers = delivers;
      this.delivers = this.delivers.data.docs;
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

    this.filteredProductOptions = this.productControl.valueChanges.pipe(startWith(''), map(value => this._filter(value, this.products)));
    this.filteredUnitOptions = this.unitsControl.valueChanges.pipe(startWith(''), map(value => this._filter(value, this.unities)));

  }

  private _filter(value: string, collection: any): string[] {
    const filterValue = value.toLowerCase();
    return collection.filter(option =>
      option._name.toLowerCase().includes(filterValue)
    );
  }

  fetchDeliver() {
    this.deliverService
      .getDelivers()
      .subscribe((data: Deliver[]) => {
        this.delivers = data;
        this.delivers = this.delivers.data.docs;
      })
  }

  checkDeliver(id) {
    this.router.navigate([`/check/${id}`]);
  }

  dropDeliver(id) {
    this.delivers.dropDeliver(id).subscribe(() => {
      this.fetchDeliver();
    })
  }

}
