import { CanActivateFn,Router } from '@angular/router';
import { inject, Inject } from '@angular/core';
import { Auth } from '../service/auth';

export const authGuard: CanActivateFn = () => {
  const authService=inject(Auth);
  const router=inject(Router);
  if(authService.isLoggedIn()){
    return true;
  }
  router.navigate(['/login']);
  return false;
};
