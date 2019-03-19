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
    if (parseInt(localStorage.getItem('role-value')) < 3)
      this.router.navigate(['/dashboard']);
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.userService.getUserById(this.id).subscribe(res => {
        this.user = res;
        this.updateForm.get('firstName').setValue(this.user.data._firstName);
        this.updateForm.get('lastName').setValue(this.user.data._lastName);
        this.updateForm.get('email').setValue(this.user.data._email);
        this.updateForm.get('role').setValue(this.user.data._role);
      });
    });
  }

  updateUser(firstName, lastName, email, role) {
    this.userService.updateUser(this.id, firstName, lastName, email, role).subscribe(() => {
      this.router.navigate([`/users/list`]);
    });
  }
}
