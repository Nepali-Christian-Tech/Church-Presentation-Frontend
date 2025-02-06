import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MaterialModule } from '../../../../../../slideshow-lib/src/public-api';
import { selectCurrentBook } from '../../store/bible';
import { selectCurrentSong } from '../../store/song';
import { SongState } from '../../store/song/reducers/song.reducer';
import { Bible, BibleInfo, Song } from '../models';
import { SongBibleService } from '../services';

@Component({
  selector: 'slideshow-slide-renderer',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './slide-renderer.component.html',
  styleUrls: ['./slide-renderer.component.scss']
})
export class SlideRendererComponent implements OnInit, OnDestroy {

  showInFullscreen: boolean = false;
  showButton: boolean = false;
  showBhajan: boolean = false;
  showBible: boolean = false;

  bibleChapterWithVerse: Bible[] = [];
  selectedBibleChapter: number | null = null;
  boookId: number | null = null;

  @Output()
  isFullScreen: EventEmitter<boolean> = new EventEmitter();

  private readonly HIDE_BUTTON_TIMEOUT_MS = 3000;
  private hideButtonTimeout: any;
  private isMouseInside: boolean = false;

  private readonly destroy$ = new Subject<void>();

  private readonly router = inject(Router);
  private readonly store = inject(Store<SongState>);
  private songBibleService = inject(SongBibleService);

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

  toggleFullscreen(): void {
    this.showInFullscreen = !this.showInFullscreen;
    this.isFullScreen.emit(this.showInFullscreen);
  }

  onMouseEnter(): void {
    this.isMouseInside = true;
    this.showButton = true;
    this.clearHideTimeout();
  }

  onMouseLeave(): void {
    this.isMouseInside = false;
    this.setHideTimeout();
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
    const bhajanPath = '/bible-bhajan/bhajan';
    const biblePath = '/bible-bhajan/bible';
    this.showBhajan = url.endsWith(bhajanPath);
    this.showBible = url.endsWith(biblePath);
  }

  private setHideTimeout(): void {
    this.hideButtonTimeout = setTimeout(() => {
      if (!this.isMouseInside) {
        this.showButton = false;
      }
    }, this.HIDE_BUTTON_TIMEOUT_MS);
  }

  private clearHideTimeout(): void {
    if (this.hideButtonTimeout) {
      clearTimeout(this.hideButtonTimeout);
    }
  }
}
