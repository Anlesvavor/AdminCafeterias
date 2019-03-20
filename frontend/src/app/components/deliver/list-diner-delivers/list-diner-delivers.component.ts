import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DeliverService} from "../../../deliver.service";
import {Deliver} from "../../../deliver.model";

@Component({
  selector: 'app-list-diner-delivers',
  templateUrl: './list-diner-delivers.component.html',
  styleUrls: ['./list-diner-delivers.component.css']
})
export class ListDinerDeliversComponent implements OnInit {

  delivers: any=[];

  constructor(private deliverService: DeliverService, private router: Router) {

  }

  ngOnInit() {
    this.deliverService.getDelivers().subscribe(delivers => {
      this.delivers = delivers;
      this.delivers = this.delivers.data.docs;

      console.log(this.delivers);
    });
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
