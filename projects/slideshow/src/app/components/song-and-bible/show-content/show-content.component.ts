import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import { io } from "socket.io-client";
import { MaterialModule } from '../../../../../../slideshow-lib/src/public-api';
import { environment } from '../../../../environments/environment';

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

  private socket = io(environment.websocketWebURL);

  constructor() {
  }

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
    this.socket.on("updateSlide", (data) => {
      this.lyricArray = data;
      this.showBhajan = true;
    });
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
