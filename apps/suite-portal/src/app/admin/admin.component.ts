import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from '../home/services/maintenance.service';
import { MaintenanceRequestRespond } from '@suiteportal/api-interfaces';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MaintenanceRequestDetailDialogComponent } from '../shared/shared-components/maintenance-request-detail-dialog/maintenance-request-detail-dialog.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  maintenanceRequestLists$: Observable<
    MaintenanceRequestRespond[]
  > = this.maintenanceService.getMaintenanceRequestList();

  constructor(
    private maintenanceService: MaintenanceService,
    private matDialog: MatDialog,
    private auth: AuthService,
    private router: Router
  ) {
    //
  }

  ngOnInit(): void {
    //
  }

  onDetailClick(maintenanceRequest: MaintenanceRequestRespond): void {
    this.matDialog.open(MaintenanceRequestDetailDialogComponent, {
      data: {
        requestId: maintenanceRequest.id,
      },
    });
  }

  onCloseRequestClick(maintenanceRequest: MaintenanceRequestRespond): void {
    this.maintenanceService
      .closeMaintenanceRequest(maintenanceRequest)
      .subscribe(() => {
        this.maintenanceRequestLists$ = this.maintenanceService.getMaintenanceRequestList();
      });
  }
}
