import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../../_services';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Output() onUpdateUser = new EventEmitter<any>();
  user: {
    firstName: string,
    lastName: string,
    age: number,
    email: string
  };

  constructor(private userService: UserService) { 
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      age: null
    }
  }

  ngOnInit() {
  }

  editUser() {
    this.onUpdateUser.emit(this.user);
  }
}
