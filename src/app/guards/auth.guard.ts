import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const usuario = await firstValueFrom(authService.usuario$);
  if (usuario) {
    return true;
  }
  router.navigateByUrl('/');
  return false;
};
