import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoginService } from '../login.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  createForm: FormGroup;
  user: any={};

  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) {
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
      this.router.navigate(['/dashboard']);
    });
  }

  ngOnInit() {
  }

}
