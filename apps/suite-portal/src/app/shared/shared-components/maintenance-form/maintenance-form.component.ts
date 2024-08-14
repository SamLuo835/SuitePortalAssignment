import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import {
  ALL_SERVICE_TYPES,
  MaintenanceRequestRespond,
} from '@suiteportal/api-interfaces';
import { MaintenanceService } from '../../../services/maintenance.service';

@Component({
  selector: 'app-maintenance-form',
  templateUrl: './maintenance-form.component.html',
  styleUrls: ['./maintenance-form.component.scss'],
})
export class MaintenanceFormComponent implements OnChanges {
  serviceTypes = ALL_SERVICE_TYPES;
  backendError: Record<string, string>;
  @Input() inputMode = true;
  @Input() requestForm: MaintenanceRequestRespond;

  maintenanceForm = this.fb.group({
    summary: ['', Validators.required],
    unitNumber: ['', Validators.required],
    serviceType: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    details: [''],
  });
  constructor(
    private fb: FormBuilder,
    private maintenanceService: MaintenanceService
  ) {
    //
  }
  ngOnChanges(simpleChange: SimpleChanges): void {
    if (simpleChange['requestForm']) {
      this.initFormData();
    }
  }

  initFormData() {
    this.maintenanceForm.patchValue(this.requestForm);
    this.maintenanceForm.disable();
  }

  onSubmit(_$event, formDirective: FormGroupDirective): void {
    if (this.maintenanceForm.invalid) {
      console.warn('Invalid form');
      return;
    }
    this.maintenanceService
      .createMaintenanceRequest(this.maintenanceForm.value)
      .subscribe(
        (_res) => {
          this.maintenanceForm.reset();
          formDirective.resetForm();
          alert('Maintenance request created successfully');
        },
        (err) => {
          console.error(err);
          this.backendError = err.error;
        }
      );
  }
}
