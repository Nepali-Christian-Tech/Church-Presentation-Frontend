import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../../../slideshow-lib/src/public-api';

import { CommonModule } from '@angular/common';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';

@Component({
  selector: 'slideshow-presentation',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './presentation.component.html',
  styleUrl: './presentation.component.scss'
})
export class PresentationComponent implements OnInit {

  ngOnInit(): void {
    this.initializeRevealJS();
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
