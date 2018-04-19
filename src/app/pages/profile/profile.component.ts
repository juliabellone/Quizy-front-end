import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService, UserService, AuthenticationService, FileService } from '../../_services';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    avatar: {
      pic_path: string,
    }
  };
  userId: string;
  isLoggedIn: any;

  constructor(
    private route: ActivatedRoute,
    private userService : UserService,
    private alertService: AlertService,
    private fileService: FileService,
    private authService: AuthenticationService
  ){
    this.user = {
      email: '',
      firstName: '',
      lastName: '',
      username: '',
      avatar: {
        pic_path: ''
      }
    }
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getUserProfile(params['id'])
    });
    this.authService.isLoggedIn.subscribe((loggedIn) => this.isLoggedIn = loggedIn);
  }

  getUserProfile(id) {
    this.userService.getUserById(id)
      .subscribe(
        data => {
          this.user.username = data.username;
          this.user.firstName = data.firstName;
          this.user.lastName = data.lastName;
          this.user.avatar.pic_path = data.avatar.pic_path;
        },
        error => {
          this.alertService.error(error.error);
        });
  }
  uploadAvatar(files) {
    this.fileService.uploadAvatar(files[0], this.isLoggedIn.ui)
      .subscribe(
        data => {
          this.user.avatar.pic_path = data.avatar.pic_path;
        },
        err => {
          console.log(err);
        });
  }

}
