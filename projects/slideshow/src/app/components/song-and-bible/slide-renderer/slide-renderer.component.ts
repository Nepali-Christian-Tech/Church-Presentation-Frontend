import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../../../../../slideshow-lib/src/public-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slide-renderer',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './slide-renderer.component.html',
  styleUrl: './slide-renderer.component.scss'
})
export class SlideRendererComponent {

  showInFullscreen: boolean = false;
  showButton: boolean = false;
  
  private hideButtonTimeout: any;
  private isMouseInside: boolean = false;

  @Output()
  isFullScreen: EventEmitter<boolean> = new EventEmitter();

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

  private setHideTimeout(): void {
    this.hideButtonTimeout = setTimeout(() => {
      if (!this.isMouseInside) {
        this.showButton = false;
      }
    }, 3000);
  }

  private clearHideTimeout(): void {
    if (this.hideButtonTimeout) {
      clearTimeout(this.hideButtonTimeout);
    }
  }
}
