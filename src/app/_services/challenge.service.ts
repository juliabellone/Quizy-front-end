import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChallengeService {

  BASE_URL: string = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  addChallenge(challenge: any) {
    return this.http.post<FormData>(`${this.BASE_URL}/challenge`, challenge)
      .map((challenge: any) => {
        return challenge;
      });
  };

  updateChallenge(challenge: any, idChallenge: any) {
    return this.http.put<FormData>(`${this.BASE_URL}/challenge/${idChallenge}`, challenge)
      .map((challenge: any) => {
        return challenge;
      });
  }
}
