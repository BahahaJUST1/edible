import { Routes } from '@angular/router';
import { FoodListComponent } from './pages/food-list/food-list';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'food/:level', component: FoodListComponent },
];
