import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AdminLoginRequest,
  AdminLoginResponse,
} from '@suiteportal/api-interfaces';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ADMIN_SERVICE_BASE_URL } from '../../configs/main-config';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private readonly http: HttpClient) {
    //
  }

  /**
   * Admin login
   * @param requestBody AdminLoginRequest
   * @returns observable of login response
   */
  adminLogin(requestBody: AdminLoginRequest): Observable<AdminLoginResponse> {
    const url = `${ADMIN_SERVICE_BASE_URL}/admin-login`;
    return this.http
      .post<AdminLoginResponse>(url, requestBody)
      .pipe(catchError((err) => throwError(err)));
  }
}
