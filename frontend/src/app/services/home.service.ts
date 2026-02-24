import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Food } from '../models/food.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private http = inject(HttpClient);

  searchFood(term: string) {
    const options = {
      params: new HttpParams().set('name', term),
    };
    return this.http.get<Food[]>(`http://localhost:5243/api/food`, options);
  }
}
