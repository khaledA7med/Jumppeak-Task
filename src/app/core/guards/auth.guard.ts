import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const isLogin = localStorage.getItem('isLogin');
  const router = inject(Router);
  if (!isLogin) {
    router.navigate(['/auth']);
    return false;
  }

  return true;
};
