import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private authService: AuthenticationService,
    ) { }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).do((event: HttpEvent<any>) => {
            }, (
            err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.authService.logout();
                        this.router.navigate([`/login`]);
                    }
            }
        });
    }
}