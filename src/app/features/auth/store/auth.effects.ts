import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  registerUser,
  verifyLogin,
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  loadUsersSuccess,
  loadUsers,
  loadLoginLogs,
  loadLoginLogsSuccess,
  loadUserById,
  deleteUserById,
  loadUserByIdSuccess,
  deleteUserByIdSuccess,
  userActionFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
} from './auth.actions';
import { AuthService } from 'src/app/core/services/auth.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoginHistory } from 'src/app/core/interfaces/login-history.model';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private router: Router
  ) {}

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
      mergeMap(({ user }) =>
        this.auth.registerUser(user).pipe(
          map(() => registerSuccess()),
          catchError(() =>
            of(registerFailure({ message: 'Registration failed' }))
          )
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccess),
        tap(() => {
          Swal.fire({
            icon: 'success',
            title: 'Registration successful',
            toast: true,
            timer: 3000,
            showConfirmButton: false,
            position: 'top-end',
          });
        })
      ),
    { dispatch: false }
  );

  registerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerFailure),
        tap(({ message }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message,
          });
        })
      ),
    { dispatch: false }
  );

  verifyLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(verifyLogin),
      mergeMap(({ credentials }) =>
        this.auth.getUsers().pipe(
          map((users) => {
            const user = users.find(
              (u) =>
                u.email === credentials.email &&
                u.password === credentials.password
            );

            if (user) {
              const login: LoginHistory = {
                email: user.email,
                timestamp: new Date().toISOString(), // ✅ fixed
                status: 'success',
              };
              return loginSuccess({ login });
            } else {
              return loginFailure({ message: 'Invalid credentials' });
            }
          }),
          catchError(() =>
            of(
              loginFailure({
                message: 'Login failed. Unable to retrieve users',
              })
            )
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        mergeMap(({ login }) =>
          this.auth.logLogin(login).pipe(
            tap(() => {
              localStorage.setItem('isLogin', 'true');
              Swal.fire({
                icon: 'success',
                title: 'Login successful',
                toast: true,
                timer: 3000,
                showConfirmButton: false,
                position: 'top-end',
              });
              this.router.navigate(['/users']);
            }),
            catchError(() =>
              of(loginFailure({ message: 'Login failed while saving log' }))
            )
          )
        )
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginFailure),
        tap(({ message }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message,
          });
        })
      ),
    { dispatch: false }
  );

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.auth.getUsers().pipe(
          map((users) => loadUsersSuccess({ users })),
          catchError(() =>
            of(loginFailure({ message: 'Failed to load users' }))
          )
        )
      )
    )
  );

  loadLoginLogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLoginLogs),
      mergeMap(() =>
        this.auth.getLoginLogs().pipe(
          map((logs) => loadLoginLogsSuccess({ logs })),
          catchError(() =>
            of(loginFailure({ message: 'Failed to load login logs' }))
          )
        )
      )
    )
  );

  loadUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserById),
      mergeMap(({ id }) =>
        this.auth.getUserById(id).pipe(
          map((user) => loadUserByIdSuccess({ user })),
          catchError((err) =>
            of(userActionFailure({ error: 'Failed to load user' }))
          )
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUserById),
      mergeMap(({ id }) =>
        this.auth.deleteUser(id).pipe(
          map(() => deleteUserByIdSuccess({ id })),
          tap(() => {
            Swal.fire({
              icon: 'success',
              title: 'User Deleted Successfully',
              toast: true,
              position: 'top-end',
              timer: 3000,
              showConfirmButton: false,
            });
          }),
          catchError((err) =>
            of(userActionFailure({ error: 'Failed to delete user' }))
          )
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      mergeMap(({ id, data }) =>
        this.auth.updateUser(id, data).pipe(
          map((user) => updateUserSuccess({ user })),
          tap(() =>
            Swal.fire({
              icon: 'success',
              title: 'User updated successfully',
              toast: true,
              position: 'top-end',
              timer: 3000,
              showConfirmButton: false,
            })
          ),
          catchError(() =>
            of(updateUserFailure({ error: 'Failed to update user' }))
          )
        )
      )
    )
  );

  //   updateUserFailure$ = createEffect(() =>
  //     this.actions$.pipe(
  //       ofType(updateUserFailure),
  //       tap(({ error }) => {
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Oops...',
  //           text: error,
  //         });
  //       }),
  //       { dispatch: false }
  //     )
  //   );

  updateUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateUserFailure),
        tap(({ error }) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
          });
        })
      ),
    { dispatch: false }
  );
}
