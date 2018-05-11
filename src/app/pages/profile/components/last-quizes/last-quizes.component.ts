import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'last-quizes',
  templateUrl: './last-quizes.component.html',
  styleUrls: ['./last-quizes.component.scss']
})
export class LastQuizesComponent implements OnInit {
  @Input() lastQuizes: any;
  constructor() { 
  }
  ngOnInit() {
  }
}
