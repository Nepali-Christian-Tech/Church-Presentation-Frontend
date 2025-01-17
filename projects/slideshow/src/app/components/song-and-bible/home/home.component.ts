import { AfterViewInit, Component, Renderer2, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../../../../slideshow-lib/src/public-api';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SlideRendererComponent } from '../slide-renderer/slide-renderer.component';
import { CommonModule } from '@angular/common';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    SidebarComponent,
    SlideRendererComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {

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
