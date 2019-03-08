import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, Validator} from "@angular/forms";
import { Router }  from '@angular/router';

import { Provider } from "../../provider.model";
import { ProviderService } from "../../provider.service";



@Component({
  selector: 'app-providers-create',
  templateUrl: './providers-create.component.html',
  styleUrls: ['./providers-create.component.css']
})
export class ProvidersCreateComponent implements OnInit {
  createForm : FormGroup;

  constructor(private providerService: ProviderService, private fb: FormBuilder, private router:Router) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      contact : ['', Validators.required],
      telephoneNumber : ['', Validators.required],
      email : ['', Validators.required],
      rfc : ['', Validators.required],
      postalCode: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      extNumber: '',
      colony : ['', Validators.required]
    });
  }

  addProvider(name, contact, telephoneNumber, email, rfc, postalCode, street, number, extNumber, colony) {
    this.providerService.addProvider(name, contact, telephoneNumber, email, rfc, postalCode, street, number, extNumber, colony).subscribe(() => {
      this.router.navigate(['providers/list']);
    });
  }

  ngOnInit() {
  }

}
