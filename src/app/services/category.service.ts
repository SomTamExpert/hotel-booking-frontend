import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../models/category.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseURL = 'http://localhost:8080/categories';

  constructor(private httpClient: HttpClient) {
  }

  getCategoryById(id: number): Observable<Category> {
    return this.httpClient.get<Category>(this.baseURL + "/" + id);
  }

  createCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.baseURL, category);
  }

  updateCategory(id: number | undefined, category: Category): Observable<Category> {
    return this.httpClient.put<Category>(this.baseURL + "/" + id, category);
  }

  deleteCategory(id: number | undefined): Observable<any> {
    return this.httpClient.delete(this.baseURL + "/" + id);
  }

  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.baseURL);
  }

}
