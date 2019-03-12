import { Component, OnInit } from '@angular/core';
import {RequisitionsService} from "../../../requisitions.service";
import {Requisition} from "../../../requsitions.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class RequisitionsListComponent implements OnInit {

  requisitions: any=[];
  //dislayedColumns = ['_name', '_contact', 'telephoneNumber', '_email', '_rfc', '_postalCode', '_street', '_number', '_extNumber', '_colony', '_actions'];
  generateArray(obj) {
    return Object.keys(obj).map(key => {return obj[key]});
  }

  constructor(private requisitionService: RequisitionsService, private router: Router) {

  }

  ngOnInit() {
    this.requisitionService.getRequisitions().subscribe(requisitions => {
      this.requisitions = requisitions;
      this.requisitions = this.requisitions.data.docs;

      console.log(this.requisitions);
    });
    console.log("AQUI");
    console.log(this.requisitions);

    /*
        this.fetchRequisitions();
        console.log("es este"); console.log(this.uRequisitions);
        */
  }

  fetchRequisitions() {
    this.requisitionService
      .getRequisitions()
      .subscribe((data: Requisition[]) => {
        this.requisitions = data;
        this.requisitions = this.requisitions.data.docs;
        console.log('Data requested ...');
        console.log(this.requisitions);
      })
  }

  createRequisition() {
    this.router.navigate(['/create/']);
  }

  editRequisition(id) {
    console.log(id);
    this.router.navigate([`/edit/${id}`]);
  }

  dropRequisition(id) {
    console.log(id);
    this.requisitionService.dropRequisition(id).subscribe(() => {
      this.fetchRequisitions();
    })
  }

}
