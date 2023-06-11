import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { RespuestaCreacionFG } from '../respuesta/respuesta-creacion-fg';

/**
 * Modelo utilizado para el formulario (FormGroup) de la creación de una pregunta.
 *
 * @export
 * @interface PreguntaCreacionFG
 */
export interface PreguntaCreacionFG {
  titulo: FormControl<string | null>;
  idCategoria: FormControl<number | null>;
  categoria: FormControl<string | null>;
  respuestas: FormArray<FormGroup<RespuestaCreacionFG>>;
}
