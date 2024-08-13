// vendor
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
// environment
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.token;
    req = req.clone({
      url: `${environment.baseApiSegment}/${req.url}`,
      setHeaders: {
        Authorization: `${token}`,
      },
    });
    return next.handle(req);
  }
}
