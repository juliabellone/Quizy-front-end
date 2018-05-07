import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RankingService {
  BASE_URL: string = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  addRanking(ranking: any) {
    return this.http.post(`${this.BASE_URL}/ranking`, ranking)
      .map((result: any) => {
        return result;
      });
  };

  getRanking(quizId: any) {
    return this.http.get(`${this.BASE_URL}/ranking?quizId=${quizId}`)
      .map((result:any)=> {
        return result;
      })
  }

}