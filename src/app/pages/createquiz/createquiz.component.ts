import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createquiz',
  templateUrl: './createquiz.component.html',
  styleUrls: ['./createquiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  
  quizIsCreated:boolean = false;

  constructor() { }

  ngOnInit() {
    console.log(this.quizIsCreated)
  }

}

