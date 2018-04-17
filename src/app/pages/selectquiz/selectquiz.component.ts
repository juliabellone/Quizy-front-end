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
  public quizes:any[];

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
    this.quizes = [];
      if (source == 'all') {
      this.isActive = 'all';
      this.quizApi.getCategories()
      .subscribe((response) => {
        this.quizes.push(response);
        console.log("1",this.quizes);
        this.userQuizesApi.getAllQuizes()
        .subscribe((response) => {
          this.quizes.push(response);            
          console.log("2", this.quizes);
          });
        })
      }
      else if (source == 'topics') {
        this.isActive = 'topics';
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
          console.log("2", this.quizes);
          });
      }
    }
    
}