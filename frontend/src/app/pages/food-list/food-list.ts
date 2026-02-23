import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodListService } from '../../services/food-list';
import { Food } from '../../models/food.model';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.html',
})
export class FoodListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private foodService = inject(FoodListService);

  // pour déclancher manuellement la détection de changement d'Angular
  private cdr = inject(ChangeDetectorRef);

  public foodList: Food[] = [];

  ngOnInit(): void {
    const level = this.route.snapshot.paramMap.get('level');

    this.foodService.getFoodList(level!).subscribe(response => {
      this.foodList = response;
      // on indique à Angular qu'un changement a eu lieu au niveau des données du composant
      this.cdr.detectChanges();
    });
  }
}