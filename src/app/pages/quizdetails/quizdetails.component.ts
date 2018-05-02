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
  selector: 'quizdetails',
  templateUrl: './quizdetails.component.html',
  styleUrls: ['./quizdetails.component.scss']
})
export class QuizdetailsComponent implements OnInit {
  public id;
  public source;
  public isLoggedIn: any;
  public quiz;


  constructor(
    private route: ActivatedRoute,
    private quizApi: QuizService,
    private userQuizesApi: CreateQuizService,
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
    
    this.route.params.subscribe((params) => this.id = (params['id']));
    this.route.params.subscribe((params) => this.source = String(params['source']));
    this.authService.isLoggedIn.subscribe((loggedIn) => this.isLoggedIn = loggedIn);
    this.getQuizDetails(this.source, this.id);
  }

  getQuizDetails(source, id) {
    if (source == 'users') {
      this.userQuizesApi.getQuiz(id)
        .subscribe((response) => {
          this.quiz = response;
          console.log(response)
          //que hacemos?
        })
    } else if (source == 'categories') {
      // this.quizApi.getQuizInfo(id)
      //   .subscribe((response) => {
      //     //que hacemos?
      //   });
    }
  }

}
