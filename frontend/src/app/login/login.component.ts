import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoginService } from '../login.service'
import { RoleService } from '../role.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  createForm: FormGroup;
  user: any={};
  role: any={};

  constructor(private roleService: RoleService, private loginService: LoginService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(email, password){
    const user = {
      email: email,
      password: password
    }
    this.loginService.login(user).subscribe( res => {
      console.log(res);
      this.user = res;

      localStorage.setItem('token', this.user.token);
      localStorage.setItem('name', `${this.user.data._firstName} ${this.user.data._lastName}`);
      localStorage.setItem('role', this.user.data._role);

      this.roleService.getRoleById(this.user.data._role).subscribe( res =>{
        this.role = res
        localStorage.setItem('role-value', this.role.data._value);
      });

      this.router.navigate(['/dashboard']);
    });
  }

  ngOnInit() {
    if (this.loginService.islogged())
      this.router.navigate(['/dashboard']);
  }

}
