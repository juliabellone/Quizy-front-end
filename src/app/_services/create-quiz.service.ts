import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../_services';


@Injectable()
export class CreateQuizService {
  BASE_URL: string = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  createQuiz(quiz) {
    return this.http.post(`${this.BASE_URL}/quiz`, quiz);
  }

  createQuestion(question, quizId) {
    return this.http.put(`${this.BASE_URL}/quiz/${quizId}`, question);
  }
  
  getQuiz(id) {
    return this.http.get(`${this.BASE_URL}/quiz/${id}`)
      .map((quiz:any) => quiz);
  }

  getAllQuizes() {
    return this.http.get(`${this.BASE_URL}/quiz/`);
  }
  
}
