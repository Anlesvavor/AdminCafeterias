import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CategoriesService} from "../../categories.service";
import {Category} from "../../category.model";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class CategoriesListComponent implements OnInit {


  categories: any=[];

  constructor(private categoriesService: CategoriesService, private router: Router) {

  }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.categories = this.categories.data.docs;

      console.log(this.categories);
    });
    console.log("AQUI");
    console.log(this.categories);

    /*
        this.fetchCategories();
        console.log("es este"); console.log(this.uCategories);
        */
  }

  fetchCategories() {
    this.categoriesService
      .getCategories()
      .subscribe((data: Category[]) => {
        this.categories = data;
        this.categories = this.categories.data.docs;
        console.log('Data requested ...');
        console.log(this.categories);
      })
  }

  createCategory() {
    this.router.navigate(['/create/']);
  }

  editCategory(id) {
    console.log(id);
    this.router.navigate([`/edit/${id}`]);
  }

  dropCategory(id) {
    console.log(id);
    this.categoriesService.dropCategory(id).subscribe(() => {
      this.fetchCategories();
    })
  }

}
