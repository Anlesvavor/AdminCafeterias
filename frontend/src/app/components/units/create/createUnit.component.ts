import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { UnitService } from "../../../unit.service";
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateUnitComponent implements OnInit {
  createForm: FormGroup;
  constructor(private unitService: UnitService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
    });
  }
  addUnit(name) {
    console.log("tssss");
    console.log(name);
    this.unitService.addUnit(name).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }
  ngOnInit() {
  }
}