import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../../../slideshow-lib/src/public-api';

@Component({
  selector: 'slideshow-admin-sidebar',
  standalone: true,
  imports: [
    MaterialModule,
    RouterModule
  ],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss'
})
export class AdminSidebarComponent {

}
