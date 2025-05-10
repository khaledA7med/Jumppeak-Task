import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly env: string = environment.apiUrl;
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.env}/users`);
  }

  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.env}/users`, data);
  }

  logLogin(data: any): Observable<any> {
    return this.http.post(`${this.env}/loginLogs`, data);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.env}/users/${id}`);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.env}/users/${id}`);
  }

  updateUser(id: string, data: any): Observable<any> {
    return this.http.put(`${this.env}/users/${id}`, data);
  }

  getLoginLogs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.env}/loginLogs`);
  }
}
