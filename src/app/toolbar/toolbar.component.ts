import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  
  isDarkTheme: Observable<boolean>;
  isLogin: boolean;
  
  constructor( private themeService: ThemeService, private loginService: LoginService) { }
  
  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.loginService.setLogin();
    this.loginService.getLogin().subscribe(isLogin => this.isLogin = isLogin) 
    this.checkLogin()
  }
  
  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked) ;
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  checkLogin(){
    if (parseInt(sessionStorage.getItem('loginId'))>0){
      this.isLogin = true;
    }else
    this.isLogin = false;
  }
  
}
