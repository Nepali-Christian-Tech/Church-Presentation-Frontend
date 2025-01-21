import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { MaterialModule } from '../../../public-api';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  searchForm: FormControl = new FormControl;

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter();

  @Output()
  searchCleared: EventEmitter<string> = new EventEmitter();

  private subscription: Subscription;

  constructor() {
    this.subscription = this.searchForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.searchTextChanged.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get haveSearchValue(): boolean { return !!this.searchForm.value }

  clearSearch() {
    this.searchForm.reset();
    this.searchCleared.emit("");
  }
}
