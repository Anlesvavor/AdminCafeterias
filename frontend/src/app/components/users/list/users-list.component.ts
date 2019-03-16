import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { User }  from '../../../user.model';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any=[];
  displayedColumns = ['_email', '_password', '_firstName', '_lastName', '_role', '_actions'];

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService
      .getUsers()
      .subscribe((data: User[]) => {
        this.users = data;
        this.users = this.users.data.docs;
        console.log('Data requested ...');
        console.log(this.users);
      })
  }

  createUser() {
    this.router.navigate(['/create/']);
  }

  editUser(id) {
    console.log(id);
    this.router.navigate([`/edit/${id}`]);
  }

  dropUser(id) {
    console.log(id);
    this.userService.dropUser(id).subscribe(() => {
      this.fetchUsers();
    })
  }

}
