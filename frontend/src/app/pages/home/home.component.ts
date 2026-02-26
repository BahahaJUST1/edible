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
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  public photoDataUrl: string | null = null;

  ngAfterViewInit(): void {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this.videoElement.nativeElement.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing webcam:', error);
      });
  }

  takePhoto(): void {
    // recover html elements from angular references
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    
    // adjust canvas to video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // catch the current frame of the video and convert it to a data URL witch will be convert to a downloadable image
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.photoDataUrl = canvas.toDataURL('image/png');

      this.downloadPhoto(this.photoDataUrl);
    }
  }

  downloadPhoto(dataUrl: string): void {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `photo_${Date.now()}.jpg`;
    link.click();
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
