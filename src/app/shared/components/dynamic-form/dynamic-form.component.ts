import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() config: any[] = [];
  @Input() formType: 'login' | 'register' = 'login';
  @Output() formTypeChange = new EventEmitter<'login' | 'register'>();

  form!: FormGroup;
  message = '';
  users: any[] = [];
  loginLogs: any[] = [];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUsers();
    this.loadLoginLogs();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config'] || changes['formType']) {
      this.initForm();
    }
  }

  initForm(): void {
    const group: { [key: string]: FormControl } = {};
    this.config.forEach((field) => {
      const validators = field.required ? [Validators.required] : [];
      group[field.name] = new FormControl('', validators);
    });
    this.form = new FormGroup(group);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.markAllFieldsAsTouched();
      return;
    }

    const formData = this.form.value;

    if (this.formType === 'register') {
      this.auth.registerUser(formData).subscribe({
        next: () => {
          this.message = 'Registration successful!';
          alert('Registration successful!');
          this.form.reset();
          this.loadUsers();
        },
        error: (err) => {
          console.error('Registration failed', err);
          this.message = 'Registration failed. Please try again.';
        },
      });
    } else if (this.formType === 'login') {
      this.auth.getUsers().subscribe({
        next: (users) => {
          const user = users.find(
            (u) =>
              u.email === formData.email && u.password === formData.password
          );

          if (user) {
            this.auth
              .logLogin({
                email: user.email,
                timestamp: new Date().toISOString(),
              })
              .subscribe({
                next: () => {
                  this.message = 'Login successful!';
                  alert('Login successful!');
                  this.form.reset();
                  this.loadLoginLogs();
                  this.router.navigate(['/users']);
                },
                error: (err) => {
                  console.error('Login logging failed', err);
                  this.message = 'Login succeeded, but logging failed.';
                },
              });
          } else {
            this.message = 'Login failed. Please check your credentials.';
          }
        },
        error: (err) => {
          console.error('Error fetching users', err);
          this.message = 'Login failed. Unable to retrieve users.';
        },
      });
    }
  }

  loadUsers(): void {
    this.auth.getUsers().subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error('Failed to load users', err),
    });
  }

  loadLoginLogs(): void {
    this.auth.getLoginLogs().subscribe({
      next: (data) => (this.loginLogs = data),
      error: (err) => console.error('Failed to load login logs', err),
    });
  }

  toggleForm(): void {
    this.formType = this.formType === 'login' ? 'register' : 'login';
    this.formTypeChange.emit(this.formType);
    this.form.reset();
    this.message = '';
  }

  markAllFieldsAsTouched(): void {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
