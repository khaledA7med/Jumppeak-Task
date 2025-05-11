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
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  registerUser,
  loginUser,
  loadUsersSuccess,
  loadLoginLogsSuccess,
} from 'src/app/features/auth/store/auth.actions';
import Swal from 'sweetalert2';

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
  errorMessage: string | null = null;

  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config'] || changes['formType']) {
      this.initForm();
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  // Initialize the form based on dynamic configuration
  initForm(): void {
    const group: { [key: string]: FormControl } = {};
    this.config.forEach((field) => {
      const validators = field.required ? [Validators.required] : [];
      group[field.name] = new FormControl('', validators);
    });
    this.form = new FormGroup(group);
  }

  // Form submission handler
  onSubmit(): void {
    if (this.form.invalid) {
      this.markAllFieldsAsTouched();
      return;
    }

    const formData = this.form.value;

    if (this.formType === 'register') {
      this.store.dispatch(registerUser({ user: formData }));
    } else if (this.formType === 'login') {
      this.store.dispatch(loginUser({ credentials: formData }));
    }

    this.form.reset();
  }

  // Load users from the service (error handling and setting users)
  loadUsers(): void {
    this.auth.getUsers().subscribe({
      next: (users) => {
        this.store.dispatch(loadUsersSuccess({ users }));
      },
      error: (err) => this.handleError('Failed to load users', err),
    });
  }

  // Load login logs from the service (error handling and setting logs)
  loadLoginLogs(): void {
    this.auth.getLoginLogs().subscribe({
      next: (logs) => {
        this.store.dispatch(loadLoginLogsSuccess({ logs }));
      },
      error: (err) => this.handleError('Failed to load login logs', err),
    });
  }

  // Error handler that displays errors
  handleError(message: string, err: any): void {
    this.errorMessage = message;
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
    console.error(err); // Logging the actual error
  }

  // Toggle between login and register forms
  toggleForm(): void {
    this.formType = this.formType === 'login' ? 'register' : 'login';
    this.formTypeChange.emit(this.formType);
    this.form.reset();
    this.errorMessage = null;
  }

  // Mark all form fields as touched to trigger validation errors
  markAllFieldsAsTouched(): void {
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  // Get error message for a given form field
  getFieldError(fieldName: string): string | null {
    const control = this.form.get(fieldName);
    if (control?.invalid && control?.touched) {
      return control.errors?.['required'] ? `${fieldName} is required.` : null;
    }
    return null;
  }
}
