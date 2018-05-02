import { Component, OnInit } from '@angular/core';
import { QuizService, CreateQuizService, AuthenticationService, RatingService } from '../../_services/';
import { Observable } from 'rxjs/Observable';
import { isType } from '@angular/core/src/type';
import 'rxjs/Rx'; 
import { Promise } from 'q';
import { decode } from '@angular/router/src/url_tree';
import { ActivatedRoute } from '@angular/router';
import { RankingService } from '../../_services/ranking.service';
import { OnClickEvent, OnHoverRatingChangeEvent, OnRatingChangeEven } from 'angular-star-rating';




@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  public id;
  public source;
  public allQuestions: any = {};
  public currentIndex: number = 0;
  public question: any = {};
  public title: string = "";
  public correctAnswer: string = "";
  public allAnswers: any[];
  public isLoggedIn: any;
  public ranking: {
    quizId: any,
    userId: any,
    category: string,
    result: number,
  };
  public rating: {
    quizId: any,
    userId: any,
    category: string,
    rate: number,
  };
  public timer: any;
  public timerCounter:number = 0;

  public totalCorrect: number = 0;
  public playing: Boolean;

  constructor(
    private quizApi: QuizService,
    private userQuizesApi: CreateQuizService,
    private route: ActivatedRoute,
    private rankingService: RankingService,
    private authService: AuthenticationService,
    private ratingService: RatingService,
  ) { 

  }

  ngOnInit() {
    this.route.params.subscribe((params) => this.id = (params['id']));
    this.route.params.subscribe((params) => this.source = String(params['source']));
    this.authService.isLoggedIn.subscribe((loggedIn) => this.isLoggedIn = loggedIn);
    this.getQuestions(this.source, this.id);
    this.playing = true;
  }

  getQuestions(source, id) {
    if (source == 'users') {
      this.userQuizesApi.getQuiz(id)
        .subscribe((response) => {
          this.allQuestions = response.questions;
          this.timerCounter = this.allQuestions.length * 5;
          this.prepareQuestion();
          this.ranking = {
            userId: this.isLoggedIn.ui,
            quizId: id,
            category: response.category,
            result: 0,
          };
          this.rating = {
            userId: this.isLoggedIn.ui,
            quizId: id,
            category: response.category,
            rate: 0,
          };
        })
    } else if (source == 'categories') {
      this.quizApi.getQuestions(id)
        .subscribe((response) => {
          this.allQuestions = response;
          this.timerCounter = this.allQuestions.length * 5;
          this.decodeJSON();
          this.prepareQuestion();
          this.ranking = {
            userId: this.isLoggedIn.ui,
            quizId: null,
            category: this.allQuestions[0].category,
            result: 0,
          };
          this.rating = {
            userId: this.isLoggedIn.ui,
            quizId: null,
            category: this.allQuestions[0].category,
            rate: 0,
          };
        });
    }
    this.timer = setInterval(() => {
      this.timerCounter--;
      if (this.timerCounter === 0) {
        this.timeFinished();
      }
    }, 1000);
  }


  decodeJSON() {
    this.allQuestions.forEach(element => {
      element.category = atob(element.category);
      element.type = atob(element.type);
      element.difficulty = atob(element.difficulty);
      element.question = atob(element.question);
      element.correct_answer = atob(element.correct_answer);
      element.incorrect_answers = element.incorrect_answers.map(answer => {
        return answer = atob(answer)
      });
    });
  }

  prepareQuestion() {
    if (this.endQuiz()) {
      this.timeFinished();
    } else {
      this.question = (this.allQuestions[this.currentIndex]);
      this.title = this.question.question;
      this.correctAnswer = this.question.correct_answer;
      this.allAnswers = this.question.incorrect_answers;
      this.allAnswers.push(this.correctAnswer);
      this.allAnswers.sort();
    }
  }

  getResponse(response) {
    if (response == this.correctAnswer) {
      this.totalCorrect++;
    } else {
      //console.log(response, 'answer is incorrect');
    }
    this.currentIndex++;
    this.prepareQuestion();
  }

  endQuiz() {
    if (this.currentIndex <= this.allQuestions.length - 1) {
      return false;
    } else {
      console.log('end of game');
      return true;
    }
  }

  timeFinished() {
    clearInterval(this.timer);
    this.playing = false;
    this.ranking.result = this.totalCorrect * 10 / this.allQuestions.length;
    this.rankingService.addRanking(this.ranking)
      .subscribe(
        data => { }
        , error => console.log(error)
      );
  }

  onClick = ($event: OnClickEvent) => {
    this.rating.rate = $event.rating;
    console.log(this.rating);
    this.ratingService.addRating(this.rating)
      .subscribe(
        data => { },
        error => console.log(error)
      );
  };
}