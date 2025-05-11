import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Jumppeak_Task';

  isLogin: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLogin$.subscribe((loginState) => {
      this.isLogin = loginState;
    });
  }
}
