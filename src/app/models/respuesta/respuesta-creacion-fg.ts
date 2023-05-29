import { FormControl } from '@angular/forms';

export interface RespuestaCreacionFG {
  titulo: FormControl<string | null>;
  esCorrecta: FormControl<boolean>;
}
