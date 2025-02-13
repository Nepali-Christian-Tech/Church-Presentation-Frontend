import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../../../../slideshow-lib/src/public-api';

@Component({
  selector: 'slideshow-admin-header',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})
export class AdminHeaderComponent {

  @Output()
  action: EventEmitter<any> = new EventEmitter();

  toggleSidebar(): void {
    this.action.emit();
  }
}
