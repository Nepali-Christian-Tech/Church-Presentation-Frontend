import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../../../../slideshow-lib/src/public-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slide-renderer',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './slide-renderer.component.html',
  styleUrl: './slide-renderer.component.scss'
})
export class SlideRendererComponent {

  showInFullscreen = false;

  @Output()
  isFullScreen: EventEmitter<boolean> = new EventEmitter();

  toggleFullscreen(): void {
    this.showInFullscreen = !this.showInFullscreen;
    this.isFullScreen.emit(this.showInFullscreen);
  }

}
