import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";

import { ProviderService } from "../../provider.service";
import { Provider } from "../../provider.model";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-providers-edit',
  templateUrl: './providers-edit.component.html',
  styleUrls: ['./providers-edit.component.css']
})
export class ProvidersEditComponent implements OnInit {

  id: String;
  provider: any = {};
  updateForm: FormGroup;

  constructor(private providerService: ProviderService, private router:Router, private route:ActivatedRoute, private snackBar: MatSnackBar, private fb:FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
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

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.providerService.getProviderById(this.id).subscribe(res => {
        this.provider = res;
        this.updateForm.get('name').setValue(this.provider.name);
        this.updateForm.get('contact').setValue(this.provider.contact);
        this.updateForm.get('telephoneNumber').setValue(this.provider.telephoneNumber);
        this.updateForm.get('email').setValue(this.provider.email);
        this.updateForm.get('rfc').setValue(this.provider.rfc);
        this.updateForm.get('postalCode').setValue(this.provider.postalCode);
        this.updateForm.get('street').setValue(this.provider.street);
        this.updateForm.get('Number').setValue(this.provider.number);
        this.updateForm.get('extNumber').setValue(this.provider.extNumber);
        this.updateForm.get('colony').setValue(this.provider.colony);
      });
    });
  }

  updateProvider(name, contact, telephoneNumber, email, rfc, postalCode, street, number, extNumber, colony) {
    this.providerService.updateProvider(this.id, name, contact, telephoneNumber, email, rfc, postalCode, street, number, extNumber, colony).subscribe(() => {
      this.router.navigate([`/providers/list`]);
    });
  }
}
