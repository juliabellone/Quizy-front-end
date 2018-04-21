import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    BASE_URL: string = 'http://localhost:3000/api'

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get('/api/user');
    }

    getUserById(id) {
        return this.http.get(`${this.BASE_URL}/user/${id}`)
            .map((user: any) => {
                return user;
            });
    }

    create(user: User) {
        return this.http.post('/api/user', user);
    }

    updateUser(id, user) {
        return this.http.put(`${this.BASE_URL}/user/${id}`, user)
            .map((user: any) => {
                return user;
            });
    }

    delete(id: number) {
        return this.http.delete('/api/user/' + id);
    }
}