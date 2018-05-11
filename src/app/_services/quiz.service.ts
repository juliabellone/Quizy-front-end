import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
//import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";


@Injectable()
export class QuizService {

  constructor(
    private http:HttpClient) { }

  getCategories() {
    return this.http.get(`https://opentdb.com/api_category.php`)
    .map((res:any) => res.trivia_categories);
  }  
  
  getQuestions(categoryId) {
    return this.http.get(`https://opentdb.com/api.php?amount=2&category=${categoryId}&encode=base64`)
    .map((res:any) => res.results);
  }
}