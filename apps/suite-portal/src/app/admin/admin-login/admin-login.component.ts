import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ADMIN_URL_SEGMENT } from '../../configs/main-config';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  backendError: Record<string, string>;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    //
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      console.warn('Invalid form');
      return;
    }
    this.adminService.adminLogin(this.loginForm.value).subscribe(
      (res) => {
        this.authService.token = res.token;
        this.router.navigate([`/${ADMIN_URL_SEGMENT}`]);
      },
      (error) => {
        console.warn(error);
        this.backendError = error.error;
      }
    );
  }
}
