import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { QuizService, CreateQuizService } from '../../_services';
import { Observable } from 'rxjs/Observable';
import { AlertService } from '../../_services/index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'create-question-form',
  templateUrl: './create-question-form.component.html',
  styleUrls: ['./create-question-form.component.css']
})
export class CreateQuestionFormComponent implements OnInit {

  @Input() theQuiz: any;
  private question: any;

  constructor(
    private createQuizApi: CreateQuizService, 
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    console.log('esto es thequiz', this.theQuiz)
  }

  formatQuestion() {
    //crear objeto question a partir del form
  }

  //peticion al endpoint
  createQuestion(question) {
    this.createQuizApi.createQuestion
  }

}
