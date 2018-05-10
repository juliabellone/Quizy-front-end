import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../../../_services';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notifications;

  constructor(
    private notificationsService: NotificationsService,
  ) { }

  ngOnInit() {
    this.notificationsService.getNotificationsObservable()
      .subscribe(notifications => {
        this.notifications = notifications;
      });
  }

}
