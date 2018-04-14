import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services';

@Injectable()
export class RequireAnonGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthenticationService,
    ) { }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.authService.isLoggedIn
            .take(1)
            .map((isLoggedIn) => {
                if (!isLoggedIn.auth) {
                    return true;
                } else {
                    this.router.navigate([`/profile/${isLoggedIn.ui}`]);
                    return false;
                }
            });
    }
}