import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CustomSearchPipe, MaterialModule } from '../../../../../../slideshow-lib/src/public-api';
import { Song } from '../models';
import { ShareBibleBhajanService, ShareSearchTextService, SongBibleService } from '../services';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    CustomSearchPipe
  ],
  providers: [],
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.scss'
})
export class SongsComponent implements OnInit {

  bhajanList: Song[] = [];
  currentBhajan!: Song;
  searchText: string = '';

  private readonly destroy$ = new Subject<void>();

  private songBibleService = inject(SongBibleService);
  private shareBibleBhajanService = inject(ShareBibleBhajanService);
  private shareSearchTextService = inject(ShareSearchTextService);

  ngOnInit(): void {
    this.subscribeToCurrentData();
    this.getSongList();
  }

  onBhajanSelect(bhajan: Song): void {
    this.currentBhajan = bhajan;
    this.shareBibleBhajanService.setCurrentBhajan(this.currentBhajan);
  }

  private subscribeToCurrentData(): void {
    this.shareSearchTextService.currentData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((searchText) => {
        searchText ? this.searchText = searchText : this.getSongList();
      });
  }

  private getSongList(): void {
    this.songBibleService.getSongs().subscribe((songs: Song[]) => {
      this.bhajanList = songs?.sort((a, b) => a.id - b.id) || [];
    });
  }

}
