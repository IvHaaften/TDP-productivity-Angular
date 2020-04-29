import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface UserModalData {
  user: number;
}

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  @Input()
  user: number;
  
  constructor(public dialogRef: MatDialogRef<UserModalComponent>,@Inject(MAT_DIALOG_DATA) public data: UserModalData) {
  }

  ngOnInit(){}

}
