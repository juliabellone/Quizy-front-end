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
  private question: any = {
    incorrect_answers: [],
  }

  constructor(
    private createQuizApi: CreateQuizService, 
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    console.log('esto es thequiz', this.theQuiz)
  }


  //peticion al endpoint
  createQuestion() {
    console.log('esto que es', this.question)
    this.createQuizApi.createQuestion(this.question, this.theQuiz._id)
    .subscribe(
      data => {
        console.log(data);
        // Reinicia this.question para la proxima pregunta
        this.question = {
          incorrect_answers: [],
        }
      },
      error => {
        // Por ahora no hay error en el servidor
        this.alertService.error(error.error.m);
      }
    )
  }

}
