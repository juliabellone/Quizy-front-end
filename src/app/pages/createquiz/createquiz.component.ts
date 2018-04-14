import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../_services';
import { Observable } from 'rxjs/Observable';

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
  ) { }

  ngOnInit() {
    this.getCategories();
    console.log(this.categories)
  }

  getCategories() {
    this.quizApi.getCategories()
    .subscribe((response) => {
      this.categories = response;
      console.log(this.categories)
    })
  }
/*   // sendQuiz(myForm) {
  //   console.log(myForm)

  // } */

  // {
  //   name: req.body.name,
  //   category: req.body.category,
  //   questions: [],
  //   user: req.decoded.id,
  // }
}
