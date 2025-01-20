import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule, SearchComponent } from '../../../../../../slideshow-lib/src/public-api';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MaterialModule, SearchComponent, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  getSearchText(searchText: string): void {
    console.log("Search text:", searchText);
  }
}
