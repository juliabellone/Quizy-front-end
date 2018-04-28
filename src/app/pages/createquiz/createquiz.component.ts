import { Component, OnInit } from '@angular/core';
import { FileService, AuthenticationService } from '../../_services';

@Component({
  selector: 'app-createquiz',
  templateUrl: './createquiz.component.html',
  styleUrls: ['./createquiz.component.scss']
})
export class CreateQuizComponent implements OnInit {
  isLoggedIn: any;
  quizCreated = null;


  constructor() { }

  ngOnInit() {  }

  changeStatus(quiz) {
    console.log('prueba', quiz);
    this.quizCreated = quiz;
  }  
}

