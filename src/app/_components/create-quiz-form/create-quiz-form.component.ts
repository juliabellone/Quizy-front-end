import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { QuizService, CreateQuizService } from '../../_services';
import { Observable } from 'rxjs/Observable';
import { AlertService } from '../../_services/index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-quiz-form',
  templateUrl: './create-quiz-form.component.html',
  styleUrls: ['./create-quiz-form.component.css']
})
export class CreateQuizFormComponent implements OnInit {

  @Output() onCreate = new EventEmitter();

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
        console.log(data);
        this.onCreate.emit(data);
      }, 
      error => {
        this.alertService.error(error.error.m);
      }
    ) 
  }
}

