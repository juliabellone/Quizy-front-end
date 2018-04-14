import { Component, OnInit } from '@angular/core';
import { QuizService, CreateQuizService } from '../../_services';
import { Observable } from 'rxjs/Observable';
import { AlertService } from '../../_services/index';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-createquiz',
  templateUrl: './createquiz.component.html',
  styleUrls: ['./createquiz.component.css']
})
export class CreateQuizComponent implements OnInit {

  public categories:any[];
  public quiz:any = {};

  constructor(
    private quizApi: QuizService,
    private createQuizApi: CreateQuizService, 
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.quizApi.getCategories()
    .subscribe((response) => {
      this.categories = response;
      console.log(this.categories)
    })
  }

  submitQuiz() {
    console.log(this.quiz);
    this.createQuizApi.createQuiz(this.quiz)
    .subscribe(
      data => {
        this.router.navigate([`/quiz/new/question`]);
      }, 
      error => {
        this.alertService.error(error.error.m);
      }
    ) 
  }
}

