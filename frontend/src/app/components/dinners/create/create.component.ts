import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Validator} from "@angular/forms";
import { Router }  from '@angular/router';

import { DinnerService } from "../../../dinner.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class DinnersCreateComponent implements OnInit {

  createForm : FormGroup;

  constructor(private dinnerService: DinnerService, private fb: FormBuilder, private router:Router) {
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

  ngOnInit() {
  }

}
