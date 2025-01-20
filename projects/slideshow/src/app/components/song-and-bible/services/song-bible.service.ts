import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Song } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SongBibleService {

  private base_api = environment.apiURL;

  constructor(private http: HttpClient) { }

  public getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.base_api}/songs`)
  }
}
