import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  role: any = {};

  constructor(private roleService: RoleService) { }

  ngOnInit() {
  }

  isAdmin(){
    return localStorage.getItem('role-value') > 2;
  }

}
