import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { RespuestaCreacionFG } from '../respuesta/respuesta-creacion-fg';

export interface PreguntaCreacionFG {
  titulo: FormControl<string | null>;
  idCategoria: FormControl<number | null>;
  categoria: FormControl<string | null>;
  respuestas: FormArray<FormGroup<RespuestaCreacionFG>>;
}
