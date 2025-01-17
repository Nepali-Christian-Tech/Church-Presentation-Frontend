import { AfterViewInit, Component, Renderer2, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../../slideshow-lib/src/public-api';
import { CommonModule } from '@angular/common';
import { MatDrawer } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
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
