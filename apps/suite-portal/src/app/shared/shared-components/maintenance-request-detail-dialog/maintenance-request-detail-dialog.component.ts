import { Component, Inject, Injector } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-maintenance-request-detail-dialog',
  templateUrl: './maintenance-request-detail-dialog.component.html',
  styleUrls: ['./maintenance-request-detail-dialog.component.scss'],
})
export class MaintenanceRequestDetailDialogComponent {
  requestId: string;
  dialogRef: MatDialogRef<any>;
  constructor(protected injector: Injector, @Inject(MAT_DIALOG_DATA) data) {
    this.dialogRef = this.injector.get(MatDialogRef);
    this.requestId = data?.requestId;
  }
  onCloseClick(): void {
    this.dialogRef.close();
  }
}
