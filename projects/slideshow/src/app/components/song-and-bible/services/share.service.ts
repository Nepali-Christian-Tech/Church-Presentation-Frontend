import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  private currentDataSubject = new BehaviorSubject<any | null>(null);
  currentData$ = this.currentDataSubject.asObservable();

  setCurrentBhajan(data: any): void {
    this.currentDataSubject.next(data);
  }
}
