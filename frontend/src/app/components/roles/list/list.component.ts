import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { Role }  from '../../../role.model';
import { RoleService } from '../../../role.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class RolesListComponent implements OnInit {

  roles: any=[];
  displayedColumns = ['_name', '_value', '_actions'];

  constructor(private roleService: RoleService, private router: Router) { }

  ngOnInit() {
    this.fetchRoles();
  }

  fetchRoles() {
    this.roleService
      .getRoles()
      .subscribe(roles => {
        this.roles = roles;
        this.roles = this.roles.data.docs;
      })
  }

  dropRole(id){
    this.roleService.dropRole(id).subscribe(() => {
      this.fetchRoles();
    })
  }

}
