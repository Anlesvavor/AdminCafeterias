import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Validator} from "@angular/forms";
import { Router }  from '@angular/router';

import { UserService } from "../../../user.service";
import { RoleService } from "../../../role.service"
import { Role } from "../../../role.model";


@Component({
  selector: 'app-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.css']
})
export class UserCreateComponent implements OnInit {

  createForm : FormGroup;
  roles: any=[];

  constructor(private roleService: RoleService, private userService: UserService, private fb: FormBuilder, private router:Router) {
    this.createForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  addUser(email, password, firstName, lastName, role) {
    this.userService.addUser(email, password, firstName, lastName, role).subscribe(() => {
      this.router.navigate(['users/list']);
    });
  }

  fetchRoles() {
    this.roleService
      .getRoles()
      .subscribe((data: Role[]) => {
        this.roles = data;
        this.roles = this.roles.data.docs;
      })
  }

  ngOnInit() {
    if (parseInt(localStorage.getItem('role-value')) < 3)
      this.router.navigate(['/dashboard']);
    this.fetchRoles();
  }

}
