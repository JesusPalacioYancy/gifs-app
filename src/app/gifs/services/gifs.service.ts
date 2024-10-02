import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagHistory: string[] = [];

  constructor() { }

  get tagHistory() {
    return[...this._tagHistory]
  };

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    


  }


  searchTag( tag: string ){
    if(tag.length === 0) return;
    this._tagHistory.unshift(tag)
  };

};
