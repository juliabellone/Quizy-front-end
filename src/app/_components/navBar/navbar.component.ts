import { Component, OnInit } from '@angular/core';
import { User } from '../../_models';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn$: Observable<any>;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate([`/login`]);
  }

}
