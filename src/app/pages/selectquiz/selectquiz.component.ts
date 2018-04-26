import { Component, OnInit } from '@angular/core';
import { QuizService, UserService, CreateQuizService } from '../../_services';
import { Observable } from 'rxjs/Observable';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';

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
    private userQuizesApi: CreateQuizService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.isActive = 'category';
    this.getQuizes('category');
  }

  //no mostrar todos los quizes. Hacer ngIf para mostrar los temticos o los dellos users

  getQuizes(source) {
    this.quizes = [];
      if (source == 'category') {
        this.isActive = 'category';
        this.quizApi.getCategories()
        .subscribe((response) => {
          this.quizes.push(response);            
        })
      }
      else if (source == 'users') {
        this.isActive = 'users';
        this.userQuizesApi.getAllQuizes()
        .subscribe((response) => {
          this.quizes.push(response);            
          });
      }
      console.log(this.quizes)
      console.log(this.isActive)
    }
    retrieveQuiz(quiz) {
      if(quiz.user) {
        this.router.navigate([`/quiz/users/${quiz._id}`]);
      } else {
        this.router.navigate([`quiz/categories/${quiz.id}`]);  
      }
    }
    
}