import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService, UserService } from '../../_services';

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
  };

  constructor(
    private route: ActivatedRoute,
    private userService : UserService,
    private alertService: AlertService,
  ){
    this.user = {
      firstName: '',
      lastName: '',
      username: ''
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getUserProfile(params['id'])
    })
  }

  getUserProfile(id) {
    this.userService.getUserById(id)
      .subscribe(
        data => {
          this.user.username = data.username;
        },
        error => {
          this.alertService.error(error);
        });
  }

}
