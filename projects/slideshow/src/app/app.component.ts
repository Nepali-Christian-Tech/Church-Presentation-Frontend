import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../slideshow-lib/src/public-api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
    RouterOutlet,
    CommonModule
  ],
  template: `<router-outlet />`
})
export class AppComponent {
  title = 'slideshow';
}
