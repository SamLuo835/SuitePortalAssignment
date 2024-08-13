import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MaintenanceRequest,
  MaintenanceRequestRespond,
} from '@suiteportal/api-interfaces';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  ADMIN_LOGIN_URL_SEGMENT,
  MAINTENANCE_SERVICE_BASE_URL,
} from '../../configs/main-config';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  constructor(
    private readonly http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {
    //
  }

  /**
   * Create maintenance request
   * @param requestBody MaintenanceRequest
   * @returns observable of create maintenance request response
   */
  createMaintenanceRequest(
    requestBody: MaintenanceRequest
  ): Observable<Record<string, string>> {
    const url = `${MAINTENANCE_SERVICE_BASE_URL}/`;
    return this.http
      .post<Record<string, string>>(url, requestBody)
      .pipe(catchError((err) => throwError(err)));
  }

  getMaintenanceRequest(id: string): Observable<MaintenanceRequestRespond> {
    const url = `${MAINTENANCE_SERVICE_BASE_URL}/${id}`;
    return this.http.get<MaintenanceRequestRespond>(url).pipe(
      catchError((err) => {
        if (err.error.message.includes('expired')) {
          this.auth.logout();
          this.router.navigate([`/${ADMIN_LOGIN_URL_SEGMENT}`]);
          return [];
        } else {
          throwError(err);
        }
      })
    );
  }

  closeMaintenanceRequest(
    request: MaintenanceRequestRespond
  ): Observable<Record<string, string>> {
    const url = `${MAINTENANCE_SERVICE_BASE_URL}/closeRequest`;
    return this.http
      .patch<Record<string, string>>(url, request)
      .pipe(catchError((err) => throwError(err)));
  }

  getMaintenanceRequestList(): Observable<MaintenanceRequestRespond[]> {
    const url = `${MAINTENANCE_SERVICE_BASE_URL}/`;
    return this.http.get<MaintenanceRequestRespond[]>(url).pipe(
      catchError((err) => {
        if (err.error.message.includes('expired')) {
          this.auth.logout();
          this.router.navigate([`/${ADMIN_LOGIN_URL_SEGMENT}`]);
          return [];
        } else {
          throwError(err);
        }
      })
    );
  }
}
