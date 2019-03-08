import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import {Provider} from "../../provider.model";
import {ProviderService} from "../../provider.service";


@Component({
  selector: 'app-providers-list',
  templateUrl: './providers-list.component.html',
  styleUrls: ['./providers-list.component.css']
})
export class ProvidersListComponent implements OnInit {


  providers: any=[];
  dislayedColumns = ['_name', '_contact', 'telephoneNumber', '_email', '_rfc', '_postalCode', '_street', '_number', '_extNumber', '_colony', '_actions'];

  constructor(private providerService: ProviderService, private router: Router) {

  }

  ngOnInit() {
    this.providerService.getProviders().subscribe(providers => {
      this.providers = providers;
      this.providers = this.providers.data.docs;

      console.log(this.providers);
    });
    console.log("AQUI");
    console.log(this.providers);

    /*
        this.fetchProviders();
        console.log("es este"); console.log(this.uProviders);
        */
  }

  fetchProviders() {
    this.providerService
      .getProviders()
      .subscribe((data: Provider[]) => {
        this.providers = data;
        this.providers = this.providers.data.docs;
        console.log('Data requested ...');
        console.log(this.providers);
      })
  }

  createProvider() {
    this.router.navigate(['/create/']);
  }

  editProvider(id) {
    console.log(id);
    this.router.navigate([`/edit/${id}`]);
  }

  dropProvider(id) {
    console.log(id);
    this.providerService.dropProvider(id).subscribe(() => {
      this.fetchProviders();
    })
  }

}
