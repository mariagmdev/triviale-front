import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { firstValueFrom } from 'rxjs';

/**
 * Función que actúa como salvaguarda y comprueba si el usuario ha iniciado sesión.
 */
export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Obtenemos el usuario.
  const usuario = await firstValueFrom(authService.usuario$);

  // Si hay usuario habilitamos el acceso.
  if (usuario) {
    return true;
  }

  // Sino, redireccionamos a la raiz y denegamos el acceso.
  router.navigateByUrl('/');
  return false;
};
