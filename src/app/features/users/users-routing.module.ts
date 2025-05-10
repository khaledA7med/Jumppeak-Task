import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersDataComponent } from './users-data/users-data.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersDataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
