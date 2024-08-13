import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public logout(): void {
    localStorage.removeItem('jwt_token');
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('jwt_token');
  }

  public get token(): string {
    return localStorage.getItem('jwt_token');
  }

  public set token(value: string) {
    localStorage.setItem('jwt_token', value);
  }
}
