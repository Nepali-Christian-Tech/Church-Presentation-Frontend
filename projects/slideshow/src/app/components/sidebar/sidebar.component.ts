import { Component } from '@angular/core';
import { MaterialModule } from '../../../../../slideshow-lib/src/public-api';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MaterialModule, SearchComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  defaultActiveMenu: string = 'song';

  onMenuClick(menuType: string): void {
    this.defaultActiveMenu = menuType;
  }

}
