import { Component, OnInit } from '@angular/core';
import {User} from 'src/app/models/user';
import {UserService} from 'src/app/user.service';
import {UserModalComponent } from '../user-modal/user-modal.component';
import {MatDialog} from '@angular/material/dialog';
import { ThemeService } from 'src/app/theme.service';
import {LoginService} from 'src/app/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  
  user = new User();
  
  LoginId: number
  theme:string;
  
  logoutId:number = -1;
  
  isLogin:boolean;
  
  constructor(private userService:UserService, public dialog: MatDialog, private themeService: ThemeService, public loginService:LoginService, private router: Router) {}
  
  
  ngOnInit(): void {
    this.LoginId = parseInt(sessionStorage.getItem('loginId'));
    this.logoutId; 
    this.loginService.getLogin().subscribe(isLogin => this.isLogin = isLogin)
    if(this.LoginId > 0)
    this.isLogin=true;
    else
    this.isLogin=false;
    console.log("in onInit xxxx" + this.isLogin);
    
  }
  
  //if register button has been pressed
  newUser() {
    this.theme = this.themeService.currentActive();
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '50%',
      data:{user: this.user, origin: "register"},
      panelClass: this.theme,
    });
    
    dialogRef.afterClosed().subscribe(result=>{
      if(result!= null){
        this.userService.save(result).subscribe();
        this.userService.login(result).subscribe(answer=>{
          //this.LoginId =  answer;
          //this.loginService.globalLoginId = this.LoginId; 
          this.loginService.globalLoginId = answer; 
          
          this.loginService.setLogin();
          sessionStorage.setItem('loginId', answer.toString())
          console.log("loginID = " + this.loginService.globalLoginId);
        });
      }
    })
  }
  
  //if login button has been pressed.
  loginUser() {
    this.theme = this.themeService.currentActive();
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '50%',
      data:{user: this.user, origin: "login"},
      panelClass: this.theme,
    });
    
    dialogRef.afterClosed().subscribe(result=>{
      if(result!= null){
        this.userService.login(result).subscribe(answer=>{
          //this.LoginId =  answer;
          //this.loginService.globalLoginId = this.LoginId;
          
          sessionStorage.setItem('loginId', answer.toString())
          this.LoginId = answer;
          console.log("in login xxxx " + this.isLogin);
          
          if (answer == -1){
            alert("Login failed. Incorrect credentials")
          }
          else{
            this.router.navigate(['select'])
            this.isLogin = true;
            this.loginService.globalLoginId = answer;
            this.loginService.setLogin(); 
            console.log("loginID = " + this.loginService.globalLoginId);
          }
          this.send(); 
        });
      }
    })
  }
  
  
  logout(){
    sessionStorage.setItem('loginId', this.logoutId.toString())
    this.LoginId = this.logoutId;
    this.loginService.globalLoginId = this.logoutId;
    this.loginService.setLogin(); 
    this.isLogin = false;
    console.log("in logout xxx " + this.isLogin);
    
    // this.checkLogin()
    this.router.navigate(['home'])
    //this.ngOnInit()
  }
  
  //function that sends the observable to login service 
  send(){
    this.loginService.sendProject(this.loginService.globalLoginId);
  }
  
  
  
}
