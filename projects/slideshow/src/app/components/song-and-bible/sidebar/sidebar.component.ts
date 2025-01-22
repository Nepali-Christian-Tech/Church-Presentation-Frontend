import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { MaterialModule, SearchComponent } from '../../../../../../slideshow-lib/src/public-api';
import * as DataActions from '../../store';
import { SongState } from '../../store/reducers/song.reducer';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MaterialModule, SearchComponent, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  private store = inject(Store<SongState>);

  getSearchText(searchText: string): void {
    this.store.dispatch(DataActions.setSearchText({ text: searchText }));
  }

  clearSearch(text: string): void {
    this.store.dispatch(DataActions.setSearchText({ text: " " }));
  }
}
