import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  apiURLCategories = "http://localhost:3000/api/v1/" + 'categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiURLCategories);
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiURLCategories}/${categoryId}`);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiURLCategories, category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(
      `${this.apiURLCategories}/${category.id}`,
      category
    );
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLCategories}/${categoryId}`);
  }
}
