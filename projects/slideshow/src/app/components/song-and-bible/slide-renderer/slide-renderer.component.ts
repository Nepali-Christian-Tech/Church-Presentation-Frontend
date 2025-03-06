import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { io } from "socket.io-client";
import { MaterialModule } from '../../../../../../slideshow-lib/src/public-api';
import { environment } from '../../../../environments/environment';
import { selectCurrentBook } from '../../store/bible';
import { selectCurrentSong } from '../../store/song';
import { SongState } from '../../store/song/reducers/song.reducer';
import { Bible, BibleInfo, Song } from '../models';
import { SongBibleService } from '../services';

export const UrlPath = {
  BHAJAN: '/bible-bhajan/bhajan',
  BIBLE: '/bible-bhajan/bible'
}

@Component({
  selector: 'slideshow-slide-renderer',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './slide-renderer.component.html',
  styleUrls: ['./slide-renderer.component.scss']
})
export class SlideRendererComponent implements OnInit, OnDestroy {

  showBhajan: boolean = false;
  showBible: boolean = false;

  bibleChapterWithVerse: Bible[] = [];
  selectedBibleChapter: number | null = null;
  boookId: number | null = null;

  @Output()
  isFullScreen: EventEmitter<boolean> = new EventEmitter();

  private readonly destroy$ = new Subject<void>();

  private readonly router = inject(Router);
  private readonly store = inject(Store<SongState>);
  private songBibleService = inject(SongBibleService);
  private socket = io(environment.websocketWebURL);

  currentSong$: Observable<Song | null> = this.store.select(selectCurrentSong);
  currentBook$: Observable<BibleInfo | null> = this.store.select(selectCurrentBook);

  ngOnInit(): void {
    this.updateFlagsBasedOnUrl(this.router.url);
    this.subscribeToUrlChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getChapterList(currentBook: BibleInfo): number[] {
    return Array.from({ length: currentBook.chapter - 1 }, (_, i) => i + 1);
  }

  isBibleChapterActive(bookId: number, chapter: number): boolean {
    return this.boookId === bookId && this.selectedBibleChapter === chapter;
  }

  getBibleChapter(selectedBibleBook: BibleInfo, chapter: number): void {
    this.selectedBibleChapter = chapter;
    this.boookId = selectedBibleBook.bookId;
    this.songBibleService.getBibleChapter(this.boookId, chapter).pipe(
      takeUntil(this.destroy$)
    ).subscribe((data) => {
      this.bibleChapterWithVerse = data ? data : [];
    })
  }

  // this.socket.emit("slideChange", bhajan);

  private subscribeToUrlChanges(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event) => {
        this.updateFlagsBasedOnUrl(event.urlAfterRedirects);
      });
  }

  private updateFlagsBasedOnUrl(url: string): void {
    this.showBhajan = url.endsWith(UrlPath.BHAJAN);
    this.showBible = url.endsWith(UrlPath.BIBLE);
  }
}
