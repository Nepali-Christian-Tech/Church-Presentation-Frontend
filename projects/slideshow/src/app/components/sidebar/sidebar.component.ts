import { Component } from '@angular/core';
import { MaterialModule ,SearchComponent} from '../../../../../slideshow-lib/src/public-api';

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
