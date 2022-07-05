import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SecureInnerPagesGuard } from '../helpers/secure-inner-pages.guard';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../helpers/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [SecureInnerPagesGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [SecureInnerPagesGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
