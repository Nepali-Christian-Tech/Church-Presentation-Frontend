import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, inject, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { io } from "socket.io-client";
import { KeyCode } from '../../../../../../slideshow-lib/src/lib/models/key-code.enum';
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
  selector: 'app-control-slide-show',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './control-slide-show.component.html',
  styleUrl: './control-slide-show.component.scss'
})
export class ControlSlideShowComponent {

  showBhajan: boolean = false;
  showBible: boolean = false;

  bibleChapterWithVerse: Bible[] = [];
  selectedBibleChapter: number | null = null;
  boookId: number | null = null;

  currentSlideIndex: number = 0;
  currentSongLyrics: string[] = [];
  currentSongDetails: Song | null = null;

  @Output()
  isFullScreen: EventEmitter<boolean> = new EventEmitter();

  private readonly destroy$ = new Subject<void>();

  private readonly router = inject(Router);
  private readonly store = inject(Store<SongState>);
  private songBibleService = inject(SongBibleService);
  private socket = io(environment.websocketWebURL);

  currentBook$: Observable<BibleInfo | null> = this.store.select(selectCurrentBook);

  ngOnInit(): void {
    this.getSongFromState();
    this.updateFlagsBasedOnUrl(this.router.url);
    this.subscribeToUrlChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (event.key === KeyCode.ArrowLeft) {
      this.showPreviousSlide();
    } else if (event.key === KeyCode.ArrowRight) {
      this.showNextSlide();
    }
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

  showPreviousSlide(): void {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
      this.emitSlide();
    }
  }

  showNextSlide(): void {
    if (this.currentSlideIndex < this.currentSongLyrics.length - 1) {
      this.currentSlideIndex++;
      this.emitSlide();
    }
  }

  private emitSlide(): void {
    this.socket.emit("slideChange", this.currentSongLyrics[this.currentSlideIndex]);
  }

  private getSongFromState(): void {
    this.store.select(selectCurrentSong)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe((song) => {
        if (song) {
          this.currentSongDetails = song;
          this.currentSongLyrics = song.lyrics.split(/\n\n\n+/).map((section: any) => section.trim());

          this.emitInitialSlideForSong();
        }
      });
  }

  private emitInitialSlideForSong(): void {
    this.currentSlideIndex = 0;
    if (this.currentSongLyrics.length > 0) {
      this.emitSlide();
    }
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
    this.showBhajan = url.endsWith(UrlPath.BHAJAN);
    this.showBible = url.endsWith(UrlPath.BIBLE);
  }
}
