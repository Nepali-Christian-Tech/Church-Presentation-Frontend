import { Component } from '@angular/core';
import { bhajanList } from './server';
import { MaterialModule } from '../../../../../../slideshow-lib/src/public-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-songs',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.scss'
})
export class SongsComponent {

  bhajanList = bhajanList;
  selectedBhajan: any;

  onBhajanSelect(bhajan: any):void{
    this.selectedBhajan = bhajan;
  }

}
