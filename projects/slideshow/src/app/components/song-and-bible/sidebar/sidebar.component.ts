import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule, SearchComponent } from '../../../../../../slideshow-lib/src/public-api';
import { ShareSearchTextService } from '../services';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MaterialModule, SearchComponent, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  private shareTextService = inject(ShareSearchTextService);

  getSearchText(searchText: string): void {
    this.shareTextService.setCurrentText(searchText);
  }

  clearSearch(text: string): void {
    console.warn("cleared search")
    this.shareTextService.setCurrentText(" ");
  }
}
