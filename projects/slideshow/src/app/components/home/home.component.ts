import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../../../slideshow-lib/src/public-api';

@Component({
  selector: 'slideshow-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


}
