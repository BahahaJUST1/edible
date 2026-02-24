import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { Food } from '../../models/food.model';
import { NgClass } from "@angular/common";

@Component({
  templateUrl: './home.component.html',
  imports: [RouterLink, NgClass],
  standalone: true,
})
export class HomeComponent implements AfterViewInit {
  private homeService = inject(HomeService);

  public searchTerm: string = '';
  public searchedFood: Food[] = [];
  public isModalOpen: boolean = false;

  // pour déclancher manuellement la détection de changement d'Angular
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this.videoElement.nativeElement.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing webcam:', error);
      });
  }

  updateSearchTerm(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value.trim();
    // on indique à Angular qu'un changement a eu lieu au niveau des données du composant
    this.cdr.detectChanges();
  }

  searchFood(): void {
    if (this.searchTerm.trim()) {
        this.homeService.searchFood(this.searchTerm).subscribe(response => {
            this.searchedFood = response;
            // on indique à Angular qu'un changement a eu lieu au niveau des données du composant
            this.cdr.detectChanges();
        });
        this.openModal();
    }
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
