import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.interces';


@Injectable({
  providedIn: 'root'
})
export class GifsService {
  public gifsList: Gif[] = [];
  private _tagHistory: string[] = [];
  private apiKey: string = "3GV9rNZSiUdK9CSTMrvv1znewCLBZHb6";
  private url: string = "http://api.giphy.com/v1/gifs";

  constructor(private http: HttpClient) {
    this.loadLocalStorage()
  };

  get tagHistory() {
    return[...this._tagHistory]
  };


  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if(this._tagHistory.includes(tag)){
      this._tagHistory = this._tagHistory.filter(oldTag => oldTag !== tag)
    };

    this._tagHistory = this.tagHistory.splice(0,9)
  };


  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this._tagHistory))
  }

  private loadLocalStorage():void {
    if(!localStorage.getItem('history')) return;

    this._tagHistory = JSON.parse(localStorage.getItem('history')!)

    if(this._tagHistory.length === 0) return;
    this.searchTag(this._tagHistory[0])
  };

  searchTag( tag: string ){
    tag = tag.trim()

    if(tag.length === 0) return;

    this.organizeHistory(tag)
    this._tagHistory.unshift(tag)
    this.saveLocalStorage()

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.url}/search/`,{params})
    .subscribe((res) => {
      this.gifsList = res.data
    });
  };

};
