import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Validator} from "@angular/forms";
import { Router }  from '@angular/router';

import { DinnerService } from "../../../dinner.service";
import { Dinner } from "../../../dinner.model";

import { User } from "../../../user.model";
import { UserService } from "../../../user.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class DinnersCreateComponent implements OnInit {

  createForm : FormGroup;
  users: any=[];

  constructor(private userService : UserService, private dinnerService: DinnerService, private fb: FormBuilder, private router:Router) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      user: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  addDinner(name, user, description) {
    this.dinnerService.addDinner(name, user, description).subscribe(() => {
      this.router.navigate(['dinners/list']);
    });
  }

  fetchUsers() {
    this.userService
      .getUsers()
      .subscribe((data: User[]) => {
        this.users = data;
        this.users = this.users.data.docs;
      })
  }

  ngOnInit() {
    this.fetchUsers();
  }

}
