import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import { MaterialModule } from '../../../../../../slideshow-lib/src/public-api';
import { WebSocketEvents } from '../../../constants';
import { WebSocketService } from '../services';

@Component({
  selector: 'slideshow-show-content',
  standalone: true,
  imports: [
    MaterialModule, CommonModule
  ],
  templateUrl: './show-content.component.html',
  styleUrls: ['./show-content.component.scss']
})
export class ShowContentComponent {

  lyricArray: string[] = [];
  showInFullscreen: boolean = false;

  showButton: boolean = false;
  showBhajan: boolean = false;

  private resizeObserver: ResizeObserver | null = null;

  private readonly HIDE_BUTTON_TIMEOUT_MS = 3000;
  private hideButtonTimeout: any;
  private isMouseInside: boolean = false;

  private websocketService = inject(WebSocketService);

  ngOnInit(): void {
    this.getDataFromWebSocket();
    this.initializeRevealJS();
  }

  toggleFullscreen(): void {
    this.showInFullscreen = !this.showInFullscreen;
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

  private getDataFromWebSocket(): void {
    this.websocketService.on(WebSocketEvents.SLIDE_UPDATE, (data) => {
      this.lyricArray = data;
      this.showBhajan = true;
    })
  }

  private initializeRevealJS(): void {
    let deck = new Reveal(
      {
        plugins: [Markdown],
        loop: false,
        controls: false
      },
    );
    deck.initialize();
  }

  private setHideTimeout(): void {
    this.hideButtonTimeout = setTimeout(() => {
      if (!this.isMouseInside) {
        this.showButton = false;
      }
    }, this.HIDE_BUTTON_TIMEOUT_MS);
  }

  private clearHideTimeout(): void {
    if (this.hideButtonTimeout) {
      clearTimeout(this.hideButtonTimeout);
    }
  }

}
