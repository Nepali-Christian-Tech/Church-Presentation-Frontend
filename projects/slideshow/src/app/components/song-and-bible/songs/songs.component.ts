import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../../../slideshow-lib/src/public-api';
import { Song } from '../models';
import { ShareService, SongBibleService } from '../services';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [CommonModule, MaterialModule, CommonModule,],
  providers: [],
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.scss'
})
export class SongsComponent implements OnInit {

  bhajanList: Song[] = [];
  currentBhajan!: Song;

  private songBibleService = inject(SongBibleService);
  private shareService = inject(ShareService);

  ngOnInit(): void {
    this.getSongList();
  }

  onBhajanSelect(bhajan: Song): void {
    this.currentBhajan = bhajan;
    this.shareService.setCurrentBhajan(this.currentBhajan);
  }

  private getSongList(): void {
    this.songBibleService.getSongs().subscribe((songs: Song[]) => {
      this.bhajanList = songs || [];
    });
  }
}
