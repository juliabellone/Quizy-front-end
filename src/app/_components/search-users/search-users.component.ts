import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService, AuthenticationService } from '../../_services';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})
export class SearchUsersComponent {
  @Input() searchType: string;
  @Input() friends:any;
  @Output() onSelectUser = new EventEmitter<any>();
  
  searchTerm: FormControl = new FormControl();

  searchResult = [];
  isLoggedIn: any;

  constructor(
    private userService: UserService, 
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authService.isLoggedIn.subscribe((loggedIn) => this.isLoggedIn = loggedIn);
    this.searchTerm.valueChanges
      .debounceTime(400)
      .subscribe(data => {
        if (data.length > 1) {
          if (this.searchType === 'friends') {
            this.userService.searchUserFriends(this.isLoggedIn.ui, data)
              .subscribe(response => this.searchResult = response);
          } else {
            this.userService.searchUser(data).subscribe(response => {
              this.searchResult = response.filter((item) => {
                return this.friends.indexOf(item._id) === -1;
              })
            })
          }
        } else {
          this.searchResult = [];
        }
      })
  }

  selectUser(user: any) {
    this.onSelectUser.emit(user);
  }

  goToUser(userId) {
    this.router.navigate([`/profile/${userId}`])
  }
}
