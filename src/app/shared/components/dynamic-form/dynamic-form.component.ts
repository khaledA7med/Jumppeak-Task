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
  verifyLogin,
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
  message = '';
  users: any[] = [];
  loginLogs: any[] = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store
  ) {}

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
      this.store.dispatch(registerUser({ user: formData }));
    } else if (this.formType === 'login') {
      this.store.dispatch(verifyLogin({ credentials: formData }));
    }

    this.form.reset();
  }

  loadUsers(): void {
    this.auth.getUsers().subscribe({
      next: (data) => (this.users = data),
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to load users',
        });
      },
    });
  }

  loadLoginLogs(): void {
    this.auth.getLoginLogs().subscribe({
      next: (data) => (this.loginLogs = data),
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to load login logs',
        });
      },
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
