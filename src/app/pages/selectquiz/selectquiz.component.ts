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
  public offset:number = 0;
  public pages: number[] = [];
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
    this.pages = [];
      if (source == 'category') {
        this.offset = 0;
        this.isActive = 'category';
        this.quizApi.getCategories()
        .subscribe((response) => {
          this.quizes.push(response);            
        })
      }
      else if (source == 'users') {
        this.isActive = 'users';
        this.userQuizesApi.getAllQuizes(this.offset)
        .subscribe((response: any) => {
          this.quizes.push(response.quizes);  
          this.getPages(response);     
          });
      }
    }
    retrieveQuiz(quiz) {
      if(quiz.user) {
        this.router.navigate([`/quiz/users/${quiz._id}`]);
      } else {
        this.router.navigate([`quiz/categories/${quiz.id}`]);  
      }
    }
    getPages(res) {
      const pages = Math.floor(res.count / res.limit);
      for(let i = 1; i<=pages; i++) {
        this.pages.push(i);
      }
      return pages;
    }
    getNextPage(page) {
      this.offset = page-1;
      this.getQuizes('users');
    }
}