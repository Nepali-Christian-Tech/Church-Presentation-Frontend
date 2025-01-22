import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs';
import { MaterialModule } from '../../../../../../slideshow-lib/src/public-api';
import * as DataActions from '../../store';
import * as DataSelectors from '../../store';
import { BibleState } from '../../store/reducers/bible.reducer';
import { BibleInfo } from '../models';

@Component({
  selector: 'app-bible',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './bible.component.html',
  styleUrl: './bible.component.scss'
})
export class BibleComponent implements OnInit {

  private store = inject(Store<BibleState>)

  bibleInfo$ = this.store.select(DataSelectors.selectBibleInfo);
  loading$ = this.store.select(DataSelectors.selectBibleLoading);
  error$ = this.store.select(DataSelectors.selectBibleFailure);

  currentBook$ = this.store.select(DataSelectors.selectCurrentBook);

  ngOnInit(): void {
    console.log('BibleComponent initialized');
    this.bibleInfo$.pipe(
      take(1),
      filter(bible => !bible.length)
    ).subscribe(() => {
      this.store.dispatch(DataSelectors.loadBibleInfo());
    });
  }

  onBhajanSelect(bible: BibleInfo): void {
    this.store.dispatch(DataActions.setCurrentBibleBook({ currentBook: bible }))
  }
}