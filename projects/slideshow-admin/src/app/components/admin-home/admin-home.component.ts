import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';

@Component({
  selector: 'slideshow-admin-home',
  standalone: true,
  imports: [
    AdminHeaderComponent,
    AdminSidebarComponent,
    RouterModule
  ],
  template: `<slideshow-admin-header></slideshow-admin-header>
  <slideshow-admin-sidebar></slideshow-admin-sidebar>
  
  <div class="overflow-y-auto">
      <router-outlet></router-outlet>
  </div>`,
})
export class AdminHomeComponent {

}
