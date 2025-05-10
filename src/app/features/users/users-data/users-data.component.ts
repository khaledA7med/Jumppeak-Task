import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-users-data',
  templateUrl: './users-data.component.html',
  styleUrls: ['./users-data.component.scss'],
})
export class UsersDataComponent implements OnInit {
  users: User[] = [];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.auth.getUsers().subscribe({
      next: (res) => {
        this.users = res;
        console.log(this.users);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getUser(id: string) {
    this.auth.getUserById(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateUser(id: string, data: any) {
    this.auth.updateUser(id, data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteUser(id: string) {
    this.auth.deleteUser(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
