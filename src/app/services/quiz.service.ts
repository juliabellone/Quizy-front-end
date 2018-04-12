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

  getQuestion() {
      return this.http.get(`https://opentdb.com/api.php?amount=10&type=multiple&encode=base64`)
      .map((res:any) => res.results);
  }
}