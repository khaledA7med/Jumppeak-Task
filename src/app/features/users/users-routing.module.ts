import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersDataComponent } from './users-data/users-data.component';
import { LoginLogsComponent } from './login-logs/login-logs.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersDataComponent,
  },
  {
    path: 'login-logs',
    component: LoginLogsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
