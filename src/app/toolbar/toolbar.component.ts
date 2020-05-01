import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  
  isDarkTheme: Observable<boolean>;
  
  constructor( private themeService: ThemeService ) { }
  
  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }
  
  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked) ;
    this.isDarkTheme = this.themeService.isDarkTheme;
  }
  
}
