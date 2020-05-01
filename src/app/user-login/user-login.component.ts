import { Component, OnInit, Input } from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';
import {UserModalComponent } from '../user-modal/user-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  
  user = new User();
  
  projectReturn: number;

  @Input()
  appGlobal2:AppComponent
  
  constructor(private userService:UserService, public dialog: MatDialog, private snackBar: MatSnackBar) {
    
  }
  
  ngOnInit(): void {
    this.projectReturn;
  }
  
  wrongPasswordSnackbar(message: string) {
    this.snackBar.open(message, "Dismiss", {
      duration: 2000,
    });
  }
  
  //if register button has been pressed
  newUser() {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '50%',
      data:{user: this.user, origin: "register"}
    });
    
    dialogRef.afterClosed().subscribe(result=>{
      this.userService.save(result).subscribe();
    })
  }
  
  //if login button has been pressed.
  loginUser() {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '50%',
      data:{user: this.user, origin: "login"}
    });
    
    dialogRef.afterClosed().subscribe(result=>{
      this.userService.login(result).subscribe(projectReturn=> this.projectReturn = projectReturn);
      
      //console.log("returned id = " + this.projectReturn);
      
    this.appGlobal2.LoginId = this.projectReturn;
      
    })
    
  }
  
  
  
}
