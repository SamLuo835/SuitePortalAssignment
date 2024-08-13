import { Component, Inject, Injector } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaintenanceRequestRespond } from '@suiteportal/api-interfaces';

@Component({
  selector: 'app-maintenance-request-detail-dialog',
  templateUrl: './maintenance-request-detail-dialog.component.html',
  styleUrls: ['./maintenance-request-detail-dialog.component.scss'],
})
export class MaintenanceRequestDetailDialogComponent {
  requestForm: MaintenanceRequestRespond;
  dialogRef: MatDialogRef<any>;
  constructor(protected injector: Injector, @Inject(MAT_DIALOG_DATA) data) {
    this.dialogRef = this.injector.get(MatDialogRef);
    this.requestForm = data?.requestForm;
  }
  onCloseClick(): void {
    this.dialogRef.close();
  }
}
