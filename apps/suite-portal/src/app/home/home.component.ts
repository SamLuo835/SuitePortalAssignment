import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { ALL_SERVICE_TYPES } from '@suiteportal/api-interfaces';
import { MaintenanceService } from './services/maintenance.service';

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {
    //
  }

  ngOnInit(): void {
    //
  }
}
