import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { QuizService, CreateQuizService, FileService, AuthenticationService } from '../../_services';
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
  public isLoggedIn:any;
  public files: File[];

  constructor(
    private quizApi: QuizService,
    private createQuizApi: CreateQuizService, 
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private fileService: FileService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.getCategories();
    this.authService.isLoggedIn.subscribe((loggedIn) => this.isLoggedIn = loggedIn);

  }

  getCategories() {
    this.quizApi.getCategories()
    .subscribe((response) => {
      this.categories = response;
    })
  }
  uploadQuizImage(files) {
    this.files = files;
  }
  submitQuiz() {
    this.createQuizApi.createQuiz(this.quiz)
    .subscribe(
      (data: any) => {
        if (this.files) {
          this.fileService.uploadQuizImage(this.files[0], data._id)
            .subscribe(
              image => {
                this.onCreate.emit(data);
              },
              err => {
                console.log(err);
              });
        } else {
          this.onCreate.emit(data);
        }
      }, 
      error => {
        //por ahora no hay error en el servidor
        this.alertService.error(error.error.m);
      }
    ) 
  }
}

