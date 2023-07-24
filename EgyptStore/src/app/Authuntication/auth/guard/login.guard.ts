import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UsersService } from '../services/users.service';

export const loginGuard: CanActivateFn = (route, state) => {
  let router = inject(Router)

  if ('token' in localStorage) {
    if (localStorage.getItem('token') !== "") router.navigate(['/home'])
    return false

  }
  return true;
};
