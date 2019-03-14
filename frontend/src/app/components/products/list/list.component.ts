import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../product.service';
import { Product } from '../../../product.model';
import { UnitService } from '../../../unit.service';
import { Unit } from '../../../unit.model';
import { Router } from '@angular/router';
import { ProviderService } from 'src/app/provider.service';
import { Provider } from '../../../provider.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ProductsListComponent implements OnInit {

  products: any=[];
  units: any= [];
  providers: any=[];
  //dislayedColumns = ['_name', '_contact', 'telephoneNumber', '_email', '_rfc', '_postalCode', '_street', '_number', '_extNumber', '_colony', '_actions'];
  generateArray(obj) {
    return Object.keys(obj).map(key => {return obj[key]});
  }

  constructor(private productService: ProductService, private providerService: ProviderService, private unitService: UnitService, private router: Router) {

  }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.products = this.products.data.docs;
      console.log(this.products);
    });

    this.unitService.getUnits().subscribe(units => {
      this.units = units;
      this.units = this.units.data.docs;
    });

    this.providerService.getProviders().subscribe(providers => {
      this.providers = providers;
      this.providers = this.providers.data.docs;
    });

    console.log("AQUI");
    console.log(this.products);

    /*
        this.fetchProducts();
        console.log("es este"); console.log(this.uProducts);
        */
  }

  fetchProducts() {
    this.productService
      .getProducts()
      .subscribe((data: Product[]) => {
        this.products = data;
        this.products = this.products.data.docs;
        console.log('Data requested ...');
        console.log(this.products);
      })
    this.unitService
      .getUnits()
      .subscribe((data: Unit[]) => {
        this.units = data;
        this.units = this.units.data.docs;
      })
    this.providerService
    .getProviders()
    .subscribe((data: Unit[]) => {
      this.providers = data;
      this.providers = this.providers.data.docs;
    })
  }

  createProduct() {
    this.router.navigate(['/create/']);
  }

  editProduct(id) {
    console.log(id);
    this.router.navigate([`/edit/${id}`]);
  }

  dropProduct(id) {
    console.log(id);
    this.productService.dropProduct(id).subscribe(() => {
      this.fetchProducts();
    })
  }

}
