import { Component } from '@angular/core';
import { MaterialModule } from '../../../../../slideshow-lib/src/public-api';
import { SearchComponent } from '../search/search.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SlideRendererComponent } from '../slide-renderer/slide-renderer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MaterialModule,
    SidebarComponent,
    SlideRendererComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  isFullScreen: boolean = false; 

  whenFullScreen(event: boolean): void {
    this.isFullScreen = event;
  }
}
