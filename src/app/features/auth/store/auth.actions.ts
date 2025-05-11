import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/core/interfaces/user.model';
import { LoginHistory } from 'src/app/core/interfaces/login-history.model';

export const registerUser = createAction(
  '[Auth] Register User',
  props<{ user: User }>()
);

export const logLogin = createAction(
  '[Auth] Log Login',
  props<{ login: LoginHistory }>()
);

export const loginUser = createAction(
  '[Auth] Verify Login',
  props<{ credentials: { email: string; password: string } }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ login: LoginHistory }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ message: string }>()
);

export const registerSuccess = createAction('[Auth] Register Success');
export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ message: string }>()
);

export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);

export const loadLoginLogs = createAction('[Login] Load Logs');
export const loadLoginLogsSuccess = createAction(
  '[Login] Load Logs Success',
  props<{ logs: LoginHistory[] }>()
);

export const loadUserById = createAction(
  '[User] Load User By ID',
  props<{ id: string }>()
);
export const loadUserByIdSuccess = createAction(
  '[User] Load User By ID Success',
  props<{ user: User }>()
);

export const deleteUserById = createAction(
  '[User] Delete User By ID',
  props<{ id: string }>()
);
export const deleteUserByIdSuccess = createAction(
  '[User] Delete User By ID Success',
  props<{ id: string }>()
);

export const userActionFailure = createAction(
  '[User] Action Failure',
  props<{ error: string }>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{ id: string; data: any }>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ user: User }>()
);

export const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: string }>()
);
