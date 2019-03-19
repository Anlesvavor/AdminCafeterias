import { Component, OnInit } from '@angular/core';
import { DeliverService } from 'src/app/deliver.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diner-check',
  templateUrl: './dinerCheck.component.html',
  styleUrls: ['./dinerCheck.component.css']
})
export class DinerCheckComponent implements OnInit {
  deliveries: any = []

  constructor(private deliverService: DeliverService, private router: Router) { }

  ngOnInit() {
    this.deliverService.getDeliveries().subscribe(deliveries => {
      this.deliveries = deliveries;
      this.deliveries = this.deliveries.data.docs;

      console.log(this.deliveries);
    });
    console.log("AQUI");
    console.log(this.deliveries);
  }

}
