import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { ADMIN_LOGIN_URL_SEGMENT } from './configs/main-config';

@Component({
  selector: 'sp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public readonly authService: AuthService,
    private router: Router
  ) {}
  title = 'suite-portal';

  logout() {
    this.authService.logout();
    this.router.navigate([`/${ADMIN_LOGIN_URL_SEGMENT}`]);
  }
}
