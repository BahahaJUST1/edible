import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodListService } from '../../services/food-list.service';
import { Food } from '../../models/food.model';
import { FormsModule } from '@angular/forms';
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  imports: [FormsModule, NgClass]
})
export class FoodListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private foodService = inject(FoodListService);

  // pour déclancher manuellement la détection de changement d'Angular
  private cdr = inject(ChangeDetectorRef);

  public foodList: Food[] = [];
  public level: string = this.route.snapshot.paramMap.get('level')!;

  public searchTerm: string = '';

  ngOnInit(): void {
    this.foodService.getFoodList(this.level).subscribe(response => {
      this.foodList = response;
      // on indique à Angular qu'un changement a eu lieu au niveau des données du composant
      this.cdr.detectChanges();
    });
  }

  get filteredFoodList(): Food[] {
    return this.foodList.filter(food => food.name.toLowerCase().trim().includes(this.searchTerm.toLowerCase().trim()));
  }
}