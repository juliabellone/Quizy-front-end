import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../../../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notifications;

  constructor(
    private notificationsService: NotificationsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.notificationsService.getNotificationsObservable()
      .subscribe(notifications => {
        this.notifications = notifications;
      });
  }

  goToUser(userId) {
    this.router.navigate([`/profile/${userId}`])
  }
}
