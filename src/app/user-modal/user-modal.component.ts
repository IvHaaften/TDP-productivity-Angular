import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from '../user';

export interface UserModalData {
  passwordCheck: String;
  user: User;
  origin: String;
}

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {
  
  @Input()
  user: User;
  
  constructor(public dialogRef: MatDialogRef<UserModalComponent>,@Inject(MAT_DIALOG_DATA) public data: UserModalData) {
  }
  
  ngOnInit(){}
  
}
