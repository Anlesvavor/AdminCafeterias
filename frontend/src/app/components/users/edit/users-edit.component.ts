import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";


import { MatSnackBar } from "@angular/material";

import { UserService } from "../../../user.service";
import { User } from '../../../user.model';

@Component({
  selector: 'app-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UserEditComponent implements OnInit {

  id: String;
  user: any = {};
  updateForm: FormGroup;

  constructor(private userService: UserService, private router:Router, private route:ActivatedRoute, private snackBar: MatSnackBar, private fb:FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      email: ['', Validators.required],
      password: '',
      firstName: '',
      lastName: '',
      role: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.userService.getUserById(this.id).subscribe(res => {
        this.user = res;
        this.updateForm.get('email').setValue(this.user.email);
        this.updateForm.get('password').setValue(this.user.password);
        this.updateForm.get('firstName').setValue(this.user.firstName);
        this.updateForm.get('lastName').setValue(this.user.lastName);
        this.updateForm.get('role').setValue(this.user.role);
      });
    });
  }

  updateUser(email, password, firstName, lastName, role) {
    this.userService.updateUser(this.id, email, password, firstName, lastName, role).subscribe(() => {
      this.router.navigate([`/users/list`]);
    });
  }
}
