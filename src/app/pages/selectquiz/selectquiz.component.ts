import { Component, OnInit } from '@angular/core';
import { QuizService, UserService, CreateQuizService } from '../../_services';
import { Observable } from 'rxjs/Observable';
import { resetFakeAsyncZone } from '@angular/core/testing';

@Component({
  selector: 'app-selectquiz',
  templateUrl: './selectquiz.component.html',
  styleUrls: ['./selectquiz.component.scss']
})

export class SelectQuizComponent implements OnInit {
  public isActive:string;
  public quizes;

  constructor(
    private quizApi: QuizService,
    private userQuizesApi: CreateQuizService,
  ) { }

  ngOnInit() {
    this.isActive = 'topics';
    this.getQuizes('topics');
  }

  //no mostrar todos los quizes. Hacer ngIf para mostrar los temticos o los dellos users

  getQuizes(source) {
    console.log(source)
    if (source == 'all') {
      this.quizApi.getCategories()
      .subscribe((response) => {
        this.quizes = response;
        this.userQuizesApi.getAllQuizes()
        .subscribe((response) => {
          console.log(response);
          response.forEach(element => {
            this.quizes.push(element);            
          });
          console.log(this.quizes)
        })
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