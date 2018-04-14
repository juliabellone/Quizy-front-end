import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService, UserService, AuthenticationService } from '../../_services';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
  };

  constructor(
    private route: ActivatedRoute,
    private userService : UserService,
    private alertService: AlertService,
  ){
    this.user = {
      email: '',
      firstName: '',
      lastName: '',
      username: ''
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getUserProfile(params['id'])
    });
  }

  getUserProfile(id) {
    this.userService.getUserById(id)
      .subscribe(
        data => {
          this.user.username = data.username;
          this.user.firstName = data.firstName;
          this.user.lastName = data.lastName;
        },
        error => {
          this.alertService.error(error.error);
        });
  }

}
