import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";


import { MatSnackBar } from "@angular/material";

import { DeliveryTruckService } from "../../../deliveryTruck.service";
import { DeliveryTruck } from '../../../deliveryTruck.model';

@Component({
  selector: 'app-edit',
  templateUrl: './editDeliveryTrucks.component.html',
  styleUrls: ['./editDeliveryTrucks.component.css']
})
export class EditDeliveryTrucksComponent implements OnInit {

  id: String;
  deliveryTruck: any = {};
  updateForm: FormGroup;

  constructor(private deliveryTruckService: DeliveryTruckService, private router:Router, private route:ActivatedRoute, private snackBar: MatSnackBar, private fb:FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      driver: ['', Validators.required],
      plateNumber: ['', Validators.required], 
      driverPhoneNumber: ['', Validators.required], 
      capacity: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.deliveryTruckService.getDeliveryTruckById(this.id).subscribe(res => {
        console.log(res);
        this.deliveryTruck = res;
        this.updateForm.get('name').setValue(this.deliveryTruck.data._name);
        this.updateForm.get('driver').setValue(this.deliveryTruck.data._driver);
        this.updateForm.get('plateNumber').setValue(this.deliveryTruck.data._plateNumber);
        this.updateForm.get('driverPhoneNumber').setValue(this.deliveryTruck.data._driverPhoneNumber);
        this.updateForm.get('capacity').setValue(this.deliveryTruck.data._capacity);
      });
    });
  }

  updateDeliveryTruck(name, driver,  plateNumber, driverPhoneNumber, capacity) {
    this.deliveryTruckService.updateDeliveryTruck(this.id, name, driver, plateNumber, driverPhoneNumber, capacity).subscribe(() => {
      this.router.navigate([`/deliverytrucks/list`]);
    });
  }
}
