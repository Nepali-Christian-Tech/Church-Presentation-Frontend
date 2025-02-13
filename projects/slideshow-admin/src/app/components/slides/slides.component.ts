import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../../../slideshow-lib/src/public-api';

@Component({
  selector: 'slideshow-slides',
  standalone: true,
  imports: [
    MaterialModule,
    RouterModule
  ],
  templateUrl: './slides.component.html',
  styleUrl: './slides.component.scss'
})
export class SlidesComponent {

  private router = inject(Router);

  redirectToCreate(): void {
    console.log("i am clicked..")
    this.router.navigate(['/slideshow-admin/create-slide'])
  }
}
