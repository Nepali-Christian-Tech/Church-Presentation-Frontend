import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, debounceTime, distinctUntilChanged, filter, map, take } from 'rxjs';
import { MaterialModule } from '../../../../../../slideshow-lib/src/public-api';
import * as DataActions from '../../store';
import * as DataSelectors from '../../store';
import { SongState } from '../../store/reducers/song.reducer';
import { Song } from '../models';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
  ],
  providers: [],
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.scss'
})
export class SongsComponent implements OnInit {

  private store = inject(Store<SongState>);

  bhajanList$ = this.store.select(DataSelectors.selectSong);
  loading$ = this.store.select(DataSelectors.selectSongLoading);
  error$ = this.store.select(DataSelectors.selectSongFailure);
  searchText$ = this.store.select(DataSelectors.selectSearchText).pipe(
    distinctUntilChanged(),
    debounceTime(300)
  );
  currentBhajan$ = this.store.select(DataSelectors.selectCurrentSong);

  filterBhajanList$ = combineLatest([this.bhajanList$, this.searchText$]).pipe(
    map(([songs, searchText]) =>
      searchText ? songs.filter(song => song.title.toLowerCase().includes(searchText.toLowerCase())) : songs
    )
  );

  constructor() { }

  ngOnInit(): void {
    this.store.select(DataSelectors.selectSong).pipe(
      take(1),
      filter(songs => !songs.length)
    ).subscribe(() => {
      this.store.dispatch(DataActions.loadSongs());
    });
  }

  onBhajanSelect(bhajan: Song): void {
    this.store.dispatch(DataActions.setCurrentSong({ currentSong: bhajan }));
  }
}
