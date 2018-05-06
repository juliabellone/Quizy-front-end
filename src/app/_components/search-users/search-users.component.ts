import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../../_services';

@Component({
  selector: 'search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})
export class SearchUsersComponent {
  @Output() onSelectUser = new EventEmitter<File>();
  
  searchTerm: FormControl = new FormControl();

  searchResult = [];

  constructor(private userService: UserService) {
    this.searchTerm.valueChanges
      .debounceTime(400)
      .subscribe(data => {
        if (data.length > 1) {
          this.userService.searchUser(data).subscribe(response => {
            this.searchResult = response
          })
        } else {
          this.searchResult = [];
        }
      })
  }

  selectUser(user: any) {
    this.onSelectUser.emit(user);
  }
}
