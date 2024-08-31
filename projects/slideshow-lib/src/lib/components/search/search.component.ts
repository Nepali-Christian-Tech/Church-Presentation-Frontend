import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../../public-api';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

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

  private subscription: Subscription;

  constructor() {
    this.subscription = this.searchForm.valueChanges.subscribe((value) => {
      this.searchTextChanged.emit(value);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get haveSearchValue(): boolean { return !!this.searchForm.value }

  clearSearch() {
    this.searchForm.reset();
  }
}
