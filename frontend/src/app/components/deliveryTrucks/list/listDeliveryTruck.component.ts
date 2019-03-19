import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { DeliveryTruck }  from '../../../deliveryTruck.model';
import { DeliveryTruckService } from '../../../deliveryTruck.service';

@Component({
  selector: 'app-list',
  templateUrl: './listDeliveryTruck.component.html',
  styleUrls: ['./listDeliveryTruck.component.css']
})
export class ListDeliveryTruckComponent implements OnInit {

  deliveryTrucks: any=[];
  dislayedColumns = ['_deliveryTruckName'];

  constructor(private deliveryTruckService: DeliveryTruckService, private router: Router) {

  }

  ngOnInit() {
    if (parseInt(localStorage.getItem('role-value')) < 3)
      this.router.navigate(['/dashboard']);
      
    this.deliveryTruckService.getDeliveryTrucks().subscribe(deliveryTrucks => {
      this.deliveryTrucks = deliveryTrucks;
      this.deliveryTrucks = this.deliveryTrucks.data.docs;

      console.log(this.deliveryTrucks);
    });
    console.log("AQUI");
    console.log(this.deliveryTrucks);

    /*
        this.fetchUsers();
        console.log("es este"); console.log(this.uUsers);
        */
  }

  fetchDeliveryTrucks() {
    this.deliveryTruckService
      .getDeliveryTrucks()
      .subscribe((data: DeliveryTruck[]) => {
        this.deliveryTrucks = data;
        this.deliveryTrucks = this.deliveryTrucks.data.docs;
        console.log('Data requested ...');
        console.log(this.deliveryTrucks);
      })
  }

  createDeliveryTruck() {
    this.router.navigate(['/create/']);
  }

  editDeliveryTruck(name) {
    console.log(name);
    this.router.navigate([`/edit/${name}`]);
  }

  dropDeliveryTruck(id) {
    this.deliveryTruckService.dropDeliveryTruck(id).subscribe(() => {
      this.fetchDeliveryTrucks();
      this.router.navigate(['/deliverytrucks/list'])
    })
  }

}
