import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'primeraMayus',
})
export class PrimeraMayusPipe implements PipeTransform {
  transform(valor: string | null): string | null {
    if (valor == null) {
      return null;
    }
    return valor[0].toUpperCase() + valor.substring(1);
  }
}
