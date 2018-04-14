import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-createquiz',
  templateUrl: './createquiz.component.html',
  styleUrls: ['./createquiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  
  quizCreated = null;


  constructor() { }

  ngOnInit() {
  }

  changeStatus(quiz) {
    console.log('prueba', quiz);
    this.quizCreated = quiz;
  }
}

