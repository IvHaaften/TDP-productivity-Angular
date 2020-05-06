import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  
  _darkTheme = new Subject<boolean>();
  isDarkTheme = this._darkTheme.asObservable();
  theme: string;
  
  setDarkTheme(isDarkTheme: boolean) {
    this._darkTheme.next(isDarkTheme);
    if(this.isDarkTheme){this.theme="dark-theme"}else{this.theme="light-theme"};
  }

  currentActive(){
    return this.theme
  }


  
}