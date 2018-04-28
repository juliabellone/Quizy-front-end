import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RatingService {
  BASE_URL: string = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  addRating(rate: any) {
    return this.http.post(`${this.BASE_URL}/rate`, rate)
      .map((result: any) => {
        return result;
      });
  };
}