import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { QuizService, CreateQuizService } from '../../_services';
import { Observable } from 'rxjs/Observable';
import { AlertService } from '../../_services/index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-quiz-form',
  templateUrl: './create-quiz-form.component.html',
  styleUrls: ['./create-quiz-form.component.scss']
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
    })
  }

  submitQuiz() {
    this.createQuizApi.createQuiz(this.quiz)
    .subscribe(
      data => {

        this.onCreate.emit(data);
      }, 
      error => {
        //por ahora no hay error en el servidor
        this.alertService.error(error.error.m);
      }
    ) 
  }
}

