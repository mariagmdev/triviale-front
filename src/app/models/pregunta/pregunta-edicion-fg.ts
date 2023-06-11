import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { RespuestaCreacionFG } from '../respuesta/respuesta-creacion-fg';

/**
 * Modelo utilizado para el formulario (FormGroup) de la edición de una pregunta.
 *
 * @export
 * @interface PreguntaEdicionFG
 */
export interface PreguntaEdicionFG {
  titulo: FormControl<string | null>;
  idCategoria: FormControl<number | null>;
  nombreCategoria: FormControl<string | null>;
  respuestas: FormArray<FormGroup<RespuestaCreacionFG>>;
  esPublica: FormControl<boolean | null>;
}
