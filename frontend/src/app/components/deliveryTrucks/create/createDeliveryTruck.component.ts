import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { DeliveryTruckService } from "../../../deliveryTruck.service";
@Component({
  selector: 'app-create',
  templateUrl: './createDeliveryTruck.component.html',
  styleUrls: ['./createDeliveryTruck.component.css']
})
export class CreateDeliveryTruckComponent implements OnInit {
  createForm: FormGroup;
  constructor(private deliveryTruckService: DeliveryTruckService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      driver: ['', Validators.required],
      plateNumber: ['', Validators.required], 
      driverPhoneNumber: ['', Validators.required], 
      capacity: ['', Validators.required]
    });
  }
  addDeliveryTruck(name, driver, plateNumber, driverPhoneNumber, capacity) {
    this.deliveryTruckService.addDeliveryTruck(name, driver, plateNumber, driverPhoneNumber, capacity).subscribe(() => {
      this.router.navigate(['/deliverytrucks/list']);
    });
  }
  ngOnInit() {
  }
}
