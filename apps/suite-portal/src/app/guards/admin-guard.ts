// vendor
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
// configs
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {
  ADMIN_LOGIN_URL_SEGMENT,
  ADMIN_URL_SEGMENT,
} from '../configs/main-config';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardService {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    _current: ActivatedRouteSnapshot,
    _next: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let activateStatus = true;
    if (_next.url === `/${ADMIN_LOGIN_URL_SEGMENT}`) {
      if (this.authService.token) {
        activateStatus = false;
        this.router.navigate([`/${ADMIN_URL_SEGMENT}`]);
      }
    } else if (_next.url === `/${ADMIN_URL_SEGMENT}`) {
      if (!this.authService.token) {
        activateStatus = false;
        this.router.navigate([`/${ADMIN_LOGIN_URL_SEGMENT}`]);
      }
    }
    return activateStatus;
  }
}
