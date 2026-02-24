import { Routes } from '@angular/router';
import { FoodListComponent } from './pages/food-list/food-list.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'food/:level', component: FoodListComponent },
    { path: '**', redirectTo: '' },
];
