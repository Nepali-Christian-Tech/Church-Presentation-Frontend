import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Bible, BibleInfo, BibleVerse, Song } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SongBibleService {

  private http = inject(HttpClient);
  private base_api = environment.apiURL;

  public getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.base_api}/songs`);
  }

  public getBibleInfo(): Observable<BibleInfo[]> {
    return this.http.get<BibleInfo[]>(`${this.base_api}/bible/book-info`);
  }

  public getBibleChapter(book: number, chapter: number): Observable<Bible[]> {
    return this.http.get<Bible[]>(`${this.base_api}/bible/${book}/${chapter}`);
  }

  public getBibleChapterVerse(book: number, chapter: number): Observable<BibleVerse[]> {
    return this.http.get<BibleVerse[]>(`${this.base_api}/bible/${book}/${chapter}`);
  }
}
