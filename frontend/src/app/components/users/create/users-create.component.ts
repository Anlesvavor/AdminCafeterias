import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Validator} from "@angular/forms";
import { Router }  from '@angular/router';

import { UserService } from "../../../user.service";


@Component({
  selector: 'app-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.css']
})
export class UserCreateComponent implements OnInit {

  createForm : FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private router:Router) {
    this.createForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  addUser(email, password, firstName, lastName, role) {
    console.log("tssss");
    console.log(email, password, firstName, lastName, role);
    this.userService.addUser(email, password, firstName, lastName, role).subscribe(() => {
      this.router.navigate(['users/list']);
    });
  }

  ngOnInit() {
  }

}
