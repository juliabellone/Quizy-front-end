import { Component, OnInit } from '@angular/core';
import { QuizService, CreateQuizService, AuthenticationService, RatingService, RankingService } from '../../_services/';
import { Observable } from 'rxjs/Observable';
import { isType } from '@angular/core/src/type';
import 'rxjs/Rx'; 
import { Promise } from 'q';
import { decode } from '@angular/router/src/url_tree';
import { OnClickEvent, OnHoverRatingChangeEvent, OnRatingChangeEven } from 'angular-star-rating';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'quizdetails',
  templateUrl: './quizdetails.component.html',
  styleUrls: ['./quizdetails.component.scss']
})
export class QuizdetailsComponent implements OnInit {
  public id;
  public source;
  public categories;
  public categoryName;
  public isLoggedIn: any;
  public quiz;
  public ranking; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
      return this.quiz.picture && this.quiz.picture.pic_path ? `url(${this.quiz.picture.pic_path})` : `url(assets/images/pencils.jpg)`;
    } else if (this.source == 'categories') {
      return `url(assets/images/${this.id}.jpg)`
    }
  }

  getCategoryName() {
    this.categories.forEach(element => {
      if(element.id == this.id) {
        this.categoryName = element.name;
      }
    });
  }

  getQuizDetails(source, id) {
    if (source == 'users') {
      this.userQuizesApi.getQuiz(id)
        .subscribe((response) => {
          this.quiz = response;
          this.rankingService.getRanking(id)
          .subscribe((response) => {
            this.ranking = response;
            console.log (response);          
          })
        })
    } else if (source == 'categories') {
      this.quizApi.getCategories()
        .subscribe((response) => {
          this.categories = response; 
          this.getCategoryName();           
        })
      this.quizApi.getQuestions(this.id)
      .subscribe((response) => {
        this.quiz = response;  
      })
    }
  }

  retrieveQuiz() {
    if(this.source == 'users') {
      this.router.navigate([`/quiz/users/${this.id}/play`]);
    } else if (this.source == 'categories') {
      this.router.navigate([`quiz/categories/${this.id}/play`]);  
    }
  }

}
