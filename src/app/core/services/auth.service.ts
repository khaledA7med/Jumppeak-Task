import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl: string = environment.apiUrl;
  // BehaviorSubject to hold the login state (true or false)
  private isLoginSubject = new BehaviorSubject<boolean>(
    this.isLoggedInFromLocalStorage()
  );

  constructor(private http: HttpClient, private router: Router) {}

  // Observable to track login state
  isLogin$ = this.isLoginSubject.asObservable();

  // Check if the user is logged in from localStorage
  private isLoggedInFromLocalStorage(): boolean {
    return localStorage.getItem('isLogin') === 'true';
  }

  // Call this method after successful login
  login(): void {
    localStorage.setItem('isLogin', 'true');
    this.isLoginSubject.next(true); // Emit 'true' for logged-in status
  }

  // method to handle HTTP errors
  private handleError(error: any): Observable<never> {
    throw new Error(error.message || 'Server error');
  }

  // Register a new user
  registerUser(data: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/users`, data)
      .pipe(catchError(this.handleError));
  }

  // Login the user
  loginUser(data: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/loginLogs`, data)
      .pipe(catchError(this.handleError));
  }

  // Get a list of all registered users
  getUsers(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/users`)
      .pipe(catchError(this.handleError));
  }

  // Get a specific user by ID
  getUserById(id: string): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/users/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Delete a user by ID
  deleteUser(id: string): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/users/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Update user details
  updateUser(id: string, data: any): Observable<any> {
    return this.http
      .put<any>(`${this.apiUrl}/users/${id}`, data)
      .pipe(catchError(this.handleError));
  }

  // Get login logs for users
  getLoginLogs(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/loginLogs`)
      .pipe(catchError(this.handleError));
  }

  // Log out the user
  logout(): void {
    localStorage.removeItem('isLogin');
    this.isLoginSubject.next(false); // Emit false when the user logs out
    this.router.navigate(['/auth']);
  }
}
