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
    username: string,
    name: string,
    email: string,
    friends: string[],
    age: number,
    avatar: {
      pic_path: string,
    },
    userPoints: number,
    markAvg: number,
  };
  userId: string;
  isLoggedUser:Boolean;
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
      name: '',
      username: '',
      friends: [],
      age: 0,
      avatar: {
        pic_path: ''
      },
      userPoints: 0,
      markAvg: 0,
    }
  }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((loggedIn) => this.isLoggedIn = loggedIn);

    this.route.params.subscribe(params => {
      this.getUserProfile(params['id'])
      this.userId = params.id;      
        if( this.userId === this.isLoggedIn.ui) {
          this.isLoggedUser = true;
        }
    });
  }

  getUserProfile(id) {
    this.userService.getUserById(id)
      .subscribe(
        data => {
          this.user.username = data.username;
          this.user.name = data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : '';
          this.user.age = data.age;
          this.user.email = data.email;
          this.user.friends = data.friends;
          this.user.avatar.pic_path = data.avatar && data.avatar.pic_path ? data.avatar.pic_path : 'assets/images/default-avatar.png';
          this.user.userPoints = data.userPoints;
          this.user.markAvg = data.markAvg;
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
  editUser(user) {
    console.log("hola",user)
    this.userService.updateUser(this.isLoggedIn.ui, user)
      .subscribe(
        data => {
          this.user.username = data.username;
          this.user.name = data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : '';
          this.user.age = data.age;
          this.user.email = data.email;
          this.user.friends = data.friends;
          this.user.avatar.pic_path = data.avatar.pic_path;
        },
        err => {
          console.log(err);
        });
  }

}
