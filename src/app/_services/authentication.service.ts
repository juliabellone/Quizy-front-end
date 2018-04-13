import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from "../_models/user";
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    BASE_URL: string = 'http://localhost:3000/api'

    constructor(private http: HttpClient) { }

    signup(newUser: User) {
        return this.http.post<any>(`${this.BASE_URL}/signup`, newUser)
            .map(user => {
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            })
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${this.BASE_URL}/login`, { username: username, password: password })
            .map(user => {
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            });
    }

    logout() {
        localStorage.removeItem('currentUser');
    }
}