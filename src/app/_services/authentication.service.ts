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
                console.log(user);
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            })
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${this.BASE_URL}/login`, { username: username, password: password })
            .map(user => {
                console.log(user);
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}