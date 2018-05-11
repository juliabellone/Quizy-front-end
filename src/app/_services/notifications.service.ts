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
    clearInterval(this.notificationInterval);
  }

  startGetNotifications() {
    if (this.isLoggedIn.auth) {
      this.getNotifications(this.isLoggedIn.ui).subscribe();
      this.notificationInterval = setInterval(() => this.getNotifications(this.isLoggedIn.ui).subscribe(), 120000);
    }
  }

  getNotifications(idUser: any) {
    return this.http.get(`${this.BASE_URL}/notifications/${idUser}`)
      .map(notifications => {
          this.notifications.next(notifications);
      });
  }

  notificationReaded(idNotification: any) {
    return this.http.put(`${this.BASE_URL}/notifications/${idNotification}`, "readed")
      .map(notifications => {
        this.notifications.next(notifications);
      });
  }

}
