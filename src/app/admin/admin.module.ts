import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';
import { UsersComponent } from './users/users.component';
import { MoviesComponent } from './movies/movies.component';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    MoviesComponent,
    DialogBodyComponent,
  ],
  imports: [CommonModule, MaterialModule, SharedModule, AdminRoutingModule],
  entryComponents: [DialogBodyComponent],
})
export class AdminModule {}
