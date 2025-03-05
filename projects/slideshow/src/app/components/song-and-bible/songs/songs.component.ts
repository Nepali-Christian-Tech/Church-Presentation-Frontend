import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map, take } from 'rxjs';
import { io } from "socket.io-client";
import { MaterialModule } from '../../../../../../slideshow-lib/src/public-api';
import { environment } from '../../../../environments/environment';
import * as SongDataSelectors from '../../store/search';
import * as DataActions from '../../store/song';
import * as DataSelectors from '../../store/song';
import { SongState } from '../../store/song/reducers/song.reducer';
import { Song } from '../models';

@Component({
  selector: 'slideshow-songs',
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
  private socket = io(environment.websocketWebURL);

  bhajanList$ = this.store.select(DataSelectors.selectAllSongList);
  searchText$ = this.store.select(SongDataSelectors.selectSearchText);
  currentBhajan$ = this.store.select(DataSelectors.selectCurrentSong);

  filterBhajanList$ = combineLatest([this.bhajanList$, this.searchText$]).pipe(
    map(([songs, searchText]) =>
      searchText ? songs.filter(song => song.title.toLowerCase().includes(searchText.toLowerCase())) : songs
    )
  );

  ngOnInit(): void {
    this.store.select(DataSelectors.selectAllSongList).pipe(
      take(1),
      filter(songs => !songs.length)
    ).subscribe(() => {
      this.store.dispatch(DataActions.loadSongs());
    });
  }

  onBhajanSelect(bhajan: Song): void {
    this.store.dispatch(DataActions.setCurrentSong({ currentSong: bhajan }));
    this.socket.emit("slideChange", bhajan);
  }
}
