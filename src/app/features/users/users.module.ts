import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersDataComponent } from './users-data/users-data.component';
import { LoginLogsComponent } from './login-logs/login-logs.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [UsersDataComponent, LoginLogsComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NgxPaginationModule,
    SharedModule,
  ],
})
export class UsersModule {}
