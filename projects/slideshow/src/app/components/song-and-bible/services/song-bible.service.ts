import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BibleInfo, Song } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SongBibleService {

  private base_api = environment.apiURL;

  constructor(private http: HttpClient) { }

  public getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.base_api}/songs`)
  }

  public getBibleInfo(): Observable<BibleInfo[]> {
    return this.http.get<BibleInfo[]>(`${this.base_api}/bible/book-info`)
  }
}
