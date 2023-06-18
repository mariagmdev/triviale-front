import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { firstValueFrom } from 'rxjs';
import { Rol } from '../enums/rol/rol';

/**
 * Función que actúa como salvaguarda y comprueba si el usuario ha iniciado sesión y es admin.
 */
export const adminGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Obtenemos el usuario.
  const usuario = await firstValueFrom(authService.usuario$);

  // Si hay usuario y su rol es admin habilitamos el acceso.
  if (usuario && usuario.idRol === Rol.admin) {
    return true;
  }

  // Sino, redireccionamos a la raiz y denegamos el acceso.
  router.navigateByUrl('/');
  return false;
};
