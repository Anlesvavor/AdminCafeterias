import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import {Dinner} from "../../../dinner.model";
import {DinnerService} from "../../../dinner.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class DinnersListComponent implements OnInit {

  dinners: any=[];
  displayedColumns = ['_name', '_user', '_description'];

  constructor(private dinnerService: DinnerService, private router: Router) { }

  ngOnInit() {
    this.dinnerService.getDinners().subscribe(dinners => {
      this.dinners = dinners;
      this.dinners = this.dinners.data.docs;

      console.log(this.dinners);
    });
  }

  fetchDinners() {
    this.dinnerService
      .getDinners()
      .subscribe((data: Dinner[]) => {
        this.dinners = data;
        this.dinners = this.dinners.data.docs;
        console.log('Data requested ...');
        console.log(this.dinners);
      })
  }

  createDinner() {
    this.router.navigate(['/create/']);
  }

  editDinner(id) {
    console.log(id);
    this.router.navigate([`/edit/${id}`]);
  }

  dropDinner(id) {
    console.log(id);
    this.dinnerService.dropDinner(id).subscribe(() => {
      this.fetchDinners();
    })
  }

}
