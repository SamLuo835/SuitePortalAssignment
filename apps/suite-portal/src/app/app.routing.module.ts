import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuardService } from './guards/admin-guard';
import {
  ADMIN_LOGIN_URL_SEGMENT,
  ADMIN_URL_SEGMENT,
  HOME_URL_SEGMENT,
} from './configs/main-config';

const routes: Routes = [
  {
    path: '',
    redirectTo: HOME_URL_SEGMENT,
    pathMatch: 'full',
  },
  {
    path: HOME_URL_SEGMENT,
    component: HomeComponent,
  },
  {
    path: ADMIN_LOGIN_URL_SEGMENT,
    component: AdminLoginComponent,
    canActivate: [AdminGuardService],
  },
  {
    path: ADMIN_URL_SEGMENT,
    component: AdminComponent,
    canActivate: [AdminGuardService],
  },
  {
    path: '**',
    redirectTo: HOME_URL_SEGMENT,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      enableTracing: true,
      relativeLinkResolution: 'corrected',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
