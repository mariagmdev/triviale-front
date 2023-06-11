import { FormControl } from '@angular/forms';

/**
 * Modelo utilizado para el formulario (FormGroup) de la creación de una respuesta.
 *
 * @export
 * @interface RespuestaCreacionFG
 */
export interface RespuestaCreacionFG {
  titulo: FormControl<string | null>;
  esCorrecta: FormControl<boolean>;
}
