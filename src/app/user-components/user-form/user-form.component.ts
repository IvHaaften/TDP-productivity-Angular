import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  user = new User();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

    public save() {
    this.userService.save(this.user).subscribe(
     // () => this.user.reloadAll()
    );
  }

  clear(){
    //this.user.project = null;
    }

}
