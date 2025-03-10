import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Renderer2, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MaterialModule } from '../../../../../slideshow-lib/src/public-api';
import { ControlSlideShowComponent } from './control-slide-show/control-slide-show.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-song-bible',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    SidebarComponent,
    ControlSlideShowComponent
  ],
  templateUrl: './song-bible.component.html',
  styleUrl: './song-bible.component.scss'
})
export class SongBibleComponent implements AfterViewInit {

  isFullScreen: boolean = false;
  isSidebarOpen: boolean = false;

  @ViewChild(MatDrawer) sidebar!: MatDrawer;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this.renderer.listen('document', 'click', () => this.handleDocumentClick());
  }

  whenFullScreen(event: boolean): void {
    this.isFullScreen = event;
    this.hideSidebar();
  }

  toggleSidebar(event: MouseEvent) {
    event.stopPropagation();
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  private handleDocumentClick(): void {
    this.isSidebarOpen = this.sidebar?.opened;
  }

  private hideSidebar(): void {
    if (this.isFullScreen) {
      this.isSidebarOpen = false;
    }
  }
}
