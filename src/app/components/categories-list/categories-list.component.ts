import { Component, OnInit } from '@angular/core';
import {Category} from "../../models/category.model";
import {StorageService} from "../../services/storage.service";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {


  categories?: Category[];
  title = '';
  currentCategory: Category = {};
  currentIndex = -1;

  constructor(private localStorage: StorageService, private categoryService: CategoryService, private route: ActivatedRoute, private router: Router) {
  }

  currentUser: any;
  role = "";

  ngOnInit(): void {
    this.currentUser = this.localStorage.getUser();
    this.role = this.currentUser.role.toLowerCase();
    console.log("current user ", this.currentUser);
      this.retrieveAllCategories();
  }

  selectCategory(category: Category, index: number): void {
    this.currentCategory = category;
    this.currentIndex = index;
  }


  retrieveAllCategories(): void {
    console.log("retrieve all categories");
    this.categoryService.getAllCategories()
      .subscribe(
        data => {
          this.categories = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      )
  }



}
