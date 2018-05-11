import { Component, OnInit } from '@angular/core';
import { User } from './_models';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './_services';

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit{ 
    isLoggedIn$: Observable<any>;

    constructor(
      private authService: AuthenticationService,
    ) { }
  
    ngOnInit() {
      this.isLoggedIn$ = this.authService.isLoggedIn;
    }
  
}

