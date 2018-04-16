import { Component, OnInit } from '@angular/core';
import { QuizService, UserService, CreateQuizService } from '../../_services';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-selectquiz',
  templateUrl: './selectquiz.component.html',
  styleUrls: ['./selectquiz.component.scss']
})

export class SelectQuizComponent implements OnInit {
  public isActive:string;
  public quizes:any[];

  constructor(
    private quizApi: QuizService,
    private userQuizes: CreateQuizService,
  ) { }

  ngOnInit() {
    this.isActive = 'topics';
    this.getQuizes('topics');
  }

  getQuizes(source) {
    console.log(source)
    if (source == 'all') {
      this.quizApi.getCategories()
      .subscribe((response) => {
        this.quizes = response;
      })
      //peticion a nuestra api a la base de datos de quizes.       
        //Push a quizes con el resultado
    }
    if (source == 'topics') {
      this.quizApi.getCategories()
      .subscribe((response) => {
        this.quizes = response;
      })
    }
    if (source == 'users') {
      //peticion a nuestra api a la base de datos de quizes.       
    }
  }
}