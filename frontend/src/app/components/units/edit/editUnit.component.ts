import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";


import { MatSnackBar } from "@angular/material";

import { UnitService } from "../../../unit.service";
import { Unit } from '../../../unit.model';

@Component({
  selector: 'app-edit',
  templateUrl: './editUnit.component.html',
  styleUrls: ['./editUnit.component.css']
})
export class EditUnitComponent implements OnInit {

  id: String;
  unit: any = {};
  updateForm: FormGroup;

  constructor(private unitService: UnitService, private router:Router, private route:ActivatedRoute, private snackBar: MatSnackBar, private fb:FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      name: ''
    });
  }

  ngOnInit() {
    if (parseInt(localStorage.getItem('role-value')) < 3)
      this.router.navigate(['/dashboard']);
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.unitService.getUnitById(this.id).subscribe(res => {
        console.log(res);
        this.unit = res;
        this.updateForm.get('name').setValue(this.unit.data._name);
      });
    });
  }

  updateUnit(name) {
    this.unitService.updateUnit(this.id, name).subscribe(() => {
      this.router.navigate([`/units/list`]);
    });
  }
}
