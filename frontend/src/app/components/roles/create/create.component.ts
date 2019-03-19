import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { RoleService } from "../../../role.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class RolesCreateComponent implements OnInit {

  createForm : FormGroup;

  constructor(private roleService: RoleService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required]
    });
  }

  addRole(name, value){
    this.roleService.addRole(name, value).subscribe(() => {
      this.router.navigate(['/roles/list']);
    });
  }

  ngOnInit() {
    if (parseInt(localStorage.getItem('role-value')) < 3)
      this.router.navigate(['/dashboard']);
  }

}
