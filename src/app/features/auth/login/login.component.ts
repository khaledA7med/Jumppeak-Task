import { Component } from '@angular/core';
import {
  loginFormConfig,
  registrationFormConfig,
} from 'src/app/shared/components/dynamic-form/dynamic-form.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLogin = true; // Switch between login and register
  loginConfig = loginFormConfig;
  registerConfig = registrationFormConfig;

  toggleForm(formType: 'login' | 'register'): void {
    this.isLogin = formType === 'login'; // Toggle the form
  }
}
