import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Song} from '../types/song';

@Injectable({
  providedIn: 'root'
})
export class EditionService {

  constructor(private http : HttpClient) { }

  fetchEditionData(year: Number) {
    return this.http.get<Song[]>(`/data/${year}.json`);
  }
}
