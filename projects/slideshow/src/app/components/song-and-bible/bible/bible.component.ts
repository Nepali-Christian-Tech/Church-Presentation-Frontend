import { Component } from '@angular/core';
import { bhajanList } from '../songs/server';
import { MaterialModule } from '../../../../../../slideshow-lib/src/public-api';

@Component({
  selector: 'app-bible',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './bible.component.html',
  styleUrl: './bible.component.scss'
})
export class BibleComponent {
  bhajanList = bhajanList;
  selectedBhajan: any;

  onBhajanSelect(bhajan: any):void{
    this.selectedBhajan = bhajan;
  }
}
