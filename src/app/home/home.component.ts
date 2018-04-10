import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService, AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService,
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
    }

    logout() {
        this.authenticationService.logout();
    }
}