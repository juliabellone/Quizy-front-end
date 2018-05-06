import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.scss']
})
export class UserStatsComponent implements OnInit {
  @Input() stats:any;
  @Input() userPoints: number;
  constructor() {
    console.log(this.stats);
   }

  ngOnInit() {
  }

  computeClass(categoryPoints) {
    var classNames = [];  
    classNames.push('percentage-'+ Math.floor(categoryPoints*100/this.userPoints).toString());
    return classNames;
  }
}
