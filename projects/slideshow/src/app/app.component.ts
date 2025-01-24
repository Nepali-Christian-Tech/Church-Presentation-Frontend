import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { SpinnerComponent } from '../../../slideshow-lib/src/public-api';
import * as DataSelectors from '../app/components/store/loader';
import { NotificationComponent } from './components';
import { NotificationService } from './services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    SpinnerComponent,
    NotificationComponent
  ],
  template: `
  <lib-spinner [loaderStatus$]= '$loaderStatus' />
  <router-outlet />
  <app-notification 
      [showNotification]="showNotification" 
      [message]="message" 
      [isError]="isError"
      (close)="showNotification = false" />
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  private store = inject(Store);

  $loaderStatus = this.store.select(DataSelectors.selectLoader);

  message: string = '';
  isError: boolean = true;
  showNotification: boolean = false;

  private destroy$ = new Subject<void>();
  private notificationService = inject(NotificationService)

  ngOnInit(): void {
    this.listenForNotification()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private listenForNotification(): void {
    this.notificationService.notification$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(notification => {
      this.message = notification.message;
      this.isError = notification.isError;
      this.showNotification = true;

      if (!this.isError) { this.hideNotification(); }
    });
  }

  private hideNotification(): void {
    setTimeout(() => {
      this.showNotification = false;
    }, 5000)
  }
}
