import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';
import {
  selectAllUsers,
  selectSelectedUser,
} from '../../auth/store/auth.selectors';
import {
  deleteUserById,
  loadUserById,
  loadUsers,
  updateUser,
} from '../../auth/store/auth.actions';
import { registrationFormConfig } from 'src/app/shared/components/dynamic-form/dynamic-form.config';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';

@Component({
  selector: 'app-users-data',
  templateUrl: './users-data.component.html',
  styleUrls: ['./users-data.component.scss'],
})
export class UsersDataComponent implements OnInit {
  users$ = this.store.select(selectAllUsers);
  selectedUser$ = this.store.select(selectSelectedUser); // Select user by ID

  registerConfig = registrationFormConfig;
  userForm!: FormGroup;

  // Pagination variables
  page: number = 1;
  itemsPerPage: number = 12;
  totalUsers: number = 0;

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.initForm();
  }

  initForm(): void {
    const group: { [key: string]: FormControl } = {};
    this.registerConfig.forEach((field) => {
      const validators = field.required ? [Validators.required] : [];
      group[field.name] = new FormControl('', validators);
    });
    this.userForm = new FormGroup(group);
  }

  getUser(id: string): void {
    this.store.dispatch(loadUserById({ id }));
    // Assuming `selectedUser` is updated from the store after this dispatch
    this.selectedUser$.subscribe((user) => {
      if (user) {
        this.userForm.patchValue({
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          birthdate: user.birthdate,
        });
      }
    });
  }

  deleteUser(id: string): void {
    this.store.dispatch(deleteUserById({ id }));
  }

  updateUser(): void {
    if (this.userForm.valid) {
      const updatedData = this.userForm.value;

      // Use take(1) to automatically unsubscribe after receiving the value
      this.selectedUser$.pipe(take(1)).subscribe((user) => {
        if (user) {
          const userId = user.id; // Access the id after subscription

          // Dispatch the update action with the user ID and updated data
          this.store.dispatch(updateUser({ id: userId, data: updatedData }));
        }
      });
    }
  }
}
