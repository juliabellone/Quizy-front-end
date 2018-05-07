import { Component, OnInit } from '@angular/core';
import { QuizService, CreateQuizService, AuthenticationService, RatingService, RankingService } from '../../_services/';
import { Observable } from 'rxjs/Observable';
import { isType } from '@angular/core/src/type';
import 'rxjs/Rx'; 
import { Promise } from 'q';
import { decode } from '@angular/router/src/url_tree';
import { ActivatedRoute } from '@angular/router';
import { OnClickEvent, OnHoverRatingChangeEvent, OnRatingChangeEven } from 'angular-star-rating';


@Component({
  selector: 'quizdetails',
  templateUrl: './quizdetails.component.html',
  styleUrls: ['./quizdetails.component.scss']
})
export class QuizdetailsComponent implements OnInit {
  public id;
  public source;
  public categories;
  public isLoggedIn: any;
  public quiz;
  public ranking; 

  constructor(
    private route: ActivatedRoute,
    private quizApi: QuizService,
    private userQuizesApi: CreateQuizService,
    private authService: AuthenticationService,
    private rankingService: RankingService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => this.id = (params['id']));
    this.route.params.subscribe((params) => this.source = String(params['source']));
    this.authService.isLoggedIn.subscribe((loggedIn) => this.isLoggedIn = loggedIn);
    this.getQuizDetails(this.source, this.id);
  }

  get getBackgroundImage() {
    if (this.source == 'users') {
      return `url(${this.quiz.picture.pic_path})`;
    } else if (this.source == 'categories') {
      return `url(assets/images/${this.id}.jpg)`
    }

  }

  getQuizDetails(source, id) {
    if (source == 'users') {
      this.userQuizesApi.getQuiz(id)
        .subscribe((response) => {
          this.quiz = response;
          this.rankingService.getRanking(id)
          .subscribe((response) => {
            this.ranking = response;
            console.log(this.quiz)
          })
        })
    } else if (source == 'categories') {
      console.log('categories')
      this.quizApi.getCategories()
        .subscribe((response) => {
          this.categories = response;            
        })
      this.quizApi.getQuestions(this.id)
      .subscribe((response) => {
        this.quiz = response;  
        console.log (this.quiz)          
      })
    }
  }

}
