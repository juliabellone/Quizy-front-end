import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (request && request.url.indexOf('opentdb') > 0) {
            return next.handle(request);
        }
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    authorization: currentUser.token
                }
            });
        }
        return next.handle(request);
    }
}