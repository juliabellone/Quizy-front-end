import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../_services';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-selectquiz',
  templateUrl: './selectquiz.component.html',
  styleUrls: ['./selectquiz.component.css']
})

export class SelectQuizComponent implements OnInit {
  
  public categories:any[];

  constructor(
    private quizApi: QuizService,
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
}
