import { Component } from '@angular/core';
import { MaterialModule } from '../../../../../slideshow-lib/src/public-api';
import { SearchComponent } from '../search/search.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MaterialModule, 
    SidebarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
