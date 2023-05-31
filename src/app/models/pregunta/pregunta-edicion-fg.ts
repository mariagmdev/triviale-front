import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { RespuestaCreacionFG } from '../respuesta/respuesta-creacion-fg';

export interface PreguntaEdicionFG {
  titulo: FormControl<string | null>;
  idCategoria: FormControl<number | null>;
  nombreCategoria: FormControl<string | null>;
  respuestas: FormArray<FormGroup<RespuestaCreacionFG>>;
  esPublica: FormControl<boolean | null>;
}
