import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Validator} from "@angular/forms";
import { Router, ActivatedRoute }  from '@angular/router';
import { MatSnackBar } from "@angular/material";

import { DinnerService } from "../../../dinner.service";
import { Dinner } from "../../../dinner.model";

import { User } from "../../../user.model";
import { UserService } from "../../../user.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class DinnersEditComponent implements OnInit {

  id: String;
  dinner : any={};
  updateForm : FormGroup;
  users: any=[];

  constructor(private userService : UserService, private dinnerService: DinnerService, private route:ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder, private router:Router) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      user: ['', Validators.required],
      description: ['', Validators.required]
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
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.dinnerService.getDinnerById(this.id).subscribe(res => {
        this.dinner = res;
        this.updateForm.get('name').setValue(this.dinner.data._name);
        this.updateForm.get('user').setValue(this.dinner.data._user);
        this.updateForm.get('description').setValue(this.dinner.data._description);
      });
    });
  }

  updateDinner(name, user, description) {
    this.dinnerService.updateDinner(this.id, name, user, description).subscribe(() => {
      this.router.navigate([`/dinners/list`]);
    });
  }

}
