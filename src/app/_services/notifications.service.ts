import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class NotificationsService{
  BASE_URL: string = 'http://localhost:3000/api'
  private isLoggedIn;
  private notificationInterval;
  private notifications = new BehaviorSubject<any>([]);

  getNotificationsObservable() {
    return this.notifications.asObservable();
  }

  constructor(
    private http: HttpClient, 
    private authService: AuthenticationService ) {
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      }
    );
  }

  stopGetNotifications() {
    console.log('stop get notification')
    clearInterval(this.notificationInterval);
  }

  startGetNotifications() {
    if (this.isLoggedIn.auth) {
      console.log('start get notifications');
      this.getNotifications(this.isLoggedIn.ui).subscribe();
      this.notificationInterval = setInterval(() => this.getNotifications(this.isLoggedIn.ui).subscribe(), 120000);
    }
  }

  getNotifications(idUser: any) {
    console.log('get notifications');
    return this.http.get(`${this.BASE_URL}/notifications/${idUser}`)
      .map(notifications => {
          this.notifications.next(notifications);
      });
  }

}
