import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MaterialModule } from '../../../../../slideshow-lib/src/public-api';
import { CommonModule } from '@angular/common';

import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';

@Component({
  selector: 'app-slide-renderer',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './slide-renderer.component.html',
  styleUrl: './slide-renderer.component.scss'
})
export class SlideRendererComponent implements OnInit {

  showInFullscreen = false;

  @Output()
  isFullScreen: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {
    this.initializeRevealJS();
  }

  toggleFullscreen(): void {
    this.showInFullscreen = !this.showInFullscreen;
    this.isFullScreen.emit(this.showInFullscreen);
  }

  private initializeRevealJS(): void {
    let deck = new Reveal(
      {
        plugins: [Markdown],
        loop: true,
      },
    );
    deck.initialize();
  }

}
