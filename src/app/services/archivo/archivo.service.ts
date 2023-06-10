import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ArchivoService {
  readonly ruta = `${environment.api}/subir.php`;

  convertirABase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', (evento) =>
      callback(evento.target!.result!.toString())
    );
    reader.readAsDataURL(img);
  }
}
