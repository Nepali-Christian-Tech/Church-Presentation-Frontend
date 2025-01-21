import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareSearchTextService {

  private searchTextSubject = new BehaviorSubject<string>('');
  currentData$ = this.searchTextSubject.asObservable();

  setCurrentText(text: string): void {
    this.searchTextSubject.next(text);
  }
}
