import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { Unit }  from '../../../unit.model';
import { UnitService } from '../../../unit.service';

@Component({
  selector: 'app-list',
  templateUrl: './listUnit.component.html',
  styleUrls: ['./listUnit.component.css']
})
export class ListUnitComponent implements OnInit {

  units: any=[];
  dislayedColumns = ['_unitName'];

  constructor(private unitService: UnitService, private router: Router) {

  }

  ngOnInit() {
    this.unitService.getUnits().subscribe(units => {
      this.units = units;
      this.units = this.units.data.docs;

      console.log(this.units);
    });
    console.log("AQUI");
    console.log(this.units);

    /*
        this.fetchUsers();
        console.log("es este"); console.log(this.uUsers);
        */
  }

  fetchUnits() {
    this.unitService
      .getUnits()
      .subscribe((data: Unit[]) => {
        this.units = data;
        this.units = this.units.data.docs;
        console.log('Data requested ...');
        console.log(this.units);
      })
  }

  createUnit() {
    this.router.navigate(['/create/']);
  }

  editUnit(name) {
    console.log(name);
    this.router.navigate([`/edit/${name}`]);
  }

  dropUnit(name) {
    console.log(name);
    this.unitService.dropUnit(name).subscribe(() => {
      this.fetchUnits();
    })
  }

}
