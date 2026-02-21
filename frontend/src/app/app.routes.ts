import { Routes } from '@angular/router';
import { FoodListComponent } from './pages/food-list/food-list';

export const routes: Routes = [
    { path: 'food/:level', component: FoodListComponent },
];
