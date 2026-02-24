import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Food } from '../models/food.model';

@Injectable({
  providedIn: 'root',
})
export class FoodListService {
  private http = inject(HttpClient);

  getFoodList(level: string) {
    return this.http.get<Food[]>(`http://localhost:5243/api/food/${level}`);
  }
}
