import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { SpinnerComponent } from '../../../slideshow-lib/src/public-api';
import * as DataSelectors from '../app/components/store/loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    SpinnerComponent
  ],
  template: `
  <lib-spinner [loaderStatus$]= '$loaderStatus' />
  <router-outlet />
  `,
})
export class AppComponent {
  private store = inject(Store);

  $loaderStatus = this.store.select(DataSelectors.selectLoader);
}
