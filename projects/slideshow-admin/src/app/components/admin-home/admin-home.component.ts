import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../../../slideshow-lib/src/public-api';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'slideshow-admin-home',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    AdminHeaderComponent,
    AdminSidebarComponent,
  ],
  templateUrl: './admin-home.component.html',
  styles: `mat-drawer{max-width: 300px;}`
})
export class AdminHomeComponent {
  isSidebarOpen: boolean = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
