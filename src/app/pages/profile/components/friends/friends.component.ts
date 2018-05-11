import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  @Input() friends: any;
  
  constructor() { }

  ngOnInit() {
  }

}
