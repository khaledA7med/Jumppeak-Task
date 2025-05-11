import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';
import { selectSuccessfulLogins } from '../../auth/store/auth.selectors';
import { loadLoginLogs } from '../../auth/store/auth.actions';

@Component({
  selector: 'app-login-logs',
  templateUrl: './login-logs.component.html',
  styleUrls: ['./login-logs.component.scss'],
})
export class LoginLogsComponent {
  logs$ = this.store.select(selectSuccessfulLogins);
  page: number = 1;
  itemsPerPage: number = 15;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadLoginLogs()); // Dispatch action to load logs via NgRx
  }
}
