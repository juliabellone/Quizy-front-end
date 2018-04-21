import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from "../_models/user";

@Injectable()
export class AuthenticationService {
    BASE_URL: string = 'http://localhost:3000/api'

    private loggedIn = new BehaviorSubject<{ auth: boolean, ui: string }>({ auth: false, ui: "" });
    
    get isLoggedIn() {
        return this.loggedIn.asObservable(); 
    }

    constructor(private http: HttpClient) { 
        const currentUser: any = JSON.parse(localStorage.getItem('currentUser'));
        const expiredToken: boolean = currentUser ? new Date().valueOf()/1000 >= currentUser.expiresIn : false;
        if(currentUser && currentUser.auth && !expiredToken)
        {
            this.loggedIn.next({ auth: true, ui: currentUser.ui });
        }
    }

    signup(newUser: User) {
        return this.http.post<any>(`${this.BASE_URL}/signup`, newUser)
            .map(user => {
                if (user && user.token) {
                    this.loggedIn.next({ auth: true, ui: user.ui });
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            })
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${this.BASE_URL}/login`, { username: username, password: password })
            .map(user => {
                if (user && user.token) {
                    this.loggedIn.next({ auth: true, ui: user.ui });
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            });
    }

    logout() {
        this.loggedIn.next({ auth: false, ui: "" });
        localStorage.removeItem('currentUser');
    }
}