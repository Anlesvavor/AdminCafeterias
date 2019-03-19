import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";


import { MatSnackBar } from "@angular/material";

import { RoleService } from "../../../role.service";
import { Role } from '../../../role.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class RolesEditComponent implements OnInit {

  id: String;
  role: any = {};
  updateForm: FormGroup;

  constructor(private roleService: RoleService, private router:Router, private route:ActivatedRoute, private snackBar: MatSnackBar, private fb:FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (parseInt(localStorage.getItem('role-value')) < 3)
      this.router.navigate(['/dashboard']);

    this.route.params.subscribe(params => {
      this.id = params.id;
      this.roleService.getRoleById(this.id).subscribe(res => {
        this.role = res;
        this.updateForm.get('name').setValue(this.role.data._name);
        this.updateForm.get('value').setValue(this.role.data._value);
      });
    });
  }

  updateRole(name, value) {
    this.roleService.updateRole(this.id, name, value).subscribe(() => {
      this.router.navigate([`/roles/list`]);
    });
  }

}
