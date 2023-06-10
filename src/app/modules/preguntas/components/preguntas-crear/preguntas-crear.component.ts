import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { TipoNotificacion } from 'src/app/enums/tipo-notificacion/tipo-notificacion';
import { Categoria } from 'src/app/models/categoria/categoria';
import { PreguntaCreacion } from 'src/app/models/pregunta/pregunta-creacion';
import { PreguntaCreacionFG } from 'src/app/models/pregunta/pregunta-creacion-fg';
import { RespuestaCreacion } from 'src/app/models/respuesta/respuesta-creacion';
import { RespuestaCreacionFG } from 'src/app/models/respuesta/respuesta-creacion-fg';
import { ArchivoService } from 'src/app/services/archivo/archivo.service';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { NotificacionService } from 'src/app/services/notificacion/notificacion.service';
import { PreguntaService } from 'src/app/services/pregunta/pregunta.service';

@Component({
  selector: 'app-preguntas-crear',
  templateUrl: './preguntas-crear.component.html',
  styleUrls: ['./preguntas-crear.component.scss'],
})
export class PreguntasCrearComponent implements OnInit {
  form: FormGroup<PreguntaCreacionFG>;
  categorias: Categoria[];
  readonly rutaImg = this.archivoService.ruta;
  cargandoImg: boolean;
  imgCategoria: string;

  constructor(
    private categoriaService: CategoriaService,
    private preguntaService: PreguntaService,
    private notificacionService: NotificacionService,
    private router: Router,
    private archivoService: ArchivoService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup<PreguntaCreacionFG>(
      {
        titulo: new FormControl('', [Validators.required]),
        idCategoria: new FormControl(null, [Validators.required]),
        respuestas: new FormArray<FormGroup<RespuestaCreacionFG>>([]),
        categoria: new FormControl(''),
      },
      [this.unaRespuestaSeleccionadaValidator()]
    );
    for (let i = 0; i < 4; i++) {
      const respuestas = this.form.controls['respuestas'] as FormArray;
      respuestas.push(
        new FormGroup({
          titulo: new FormControl('', [Validators.required]),
          esCorrecta: new FormControl<boolean>(false),
        })
      );
    }

    this.categoriaService.listar().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  onCrear(): void {
    //Quitar espacios.
    const valorForm = this.form.value;
    this.form.patchValue({
      ...valorForm,
      titulo: valorForm.titulo?.trim(),
      categoria: valorForm.categoria?.trim(),
    });
    this.form.controls.respuestas.controls.forEach((respuestaControl) => {
      respuestaControl.patchValue({
        ...respuestaControl.value,
        titulo: respuestaControl.value.titulo?.trim(),
      });
    });
    this.form.updateValueAndValidity();
    //Salir si el formulario no es válido.
    if (!this.form.valid) {
      return;
    }
    //Generamos la pregunta a mandar para back.
    const valorFormValido = this.form.value;
    const pregunta: PreguntaCreacion = {
      titulo: valorFormValido.titulo!,
      idCategoria: valorFormValido.idCategoria!,
      categoria: valorFormValido.categoria!,
      imgCategoria: this.imgCategoria,
      respuestas: valorFormValido.respuestas!.map(
        (respuesta): RespuestaCreacion => ({
          titulo: respuesta.titulo!,
          esCorrecta: respuesta.esCorrecta!,
        })
      ),
    };
    this.preguntaService.crear(pregunta).subscribe(() => {
      this.notificacionService.mostrar({
        mensaje: 'Pregunta creada correctamente.',
        tipo: TipoNotificacion.Exito,
      });
      this.router.navigateByUrl('/');
    });
  }

  onCambioEsCorrecta(esCorrecta: boolean, i: number): void {
    const respuestasFormControl = this.form.controls.respuestas;
    respuestasFormControl.controls.forEach((respuesta) => {
      respuesta.patchValue({ esCorrecta: false });
    });
    respuestasFormControl.controls[i].patchValue({
      esCorrecta: esCorrecta,
    });
    this.form.markAsDirty();
    this.form.updateValueAndValidity();
  }

  onCambioCategoria(): void {
    const catControl = this.form.controls.categoria;
    const idCategoria = this.form.value.idCategoria;
    if (idCategoria === 0) {
      catControl.addValidators(Validators.required);
    } else {
      catControl.removeValidators(Validators.required);
    }
    this.form.updateValueAndValidity();
  }

  verificarImagen = (
    file: NzUploadFile,
    _fileList: NzUploadFile[]
  ): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.notificacionService.mostrar({
          mensaje: 'La imagen no es un .JPG ni .PNG.',
          tipo: TipoNotificacion.Error,
        });
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.notificacionService.mostrar({
          mensaje: 'La imagen pesa más de 2MB.',
          tipo: TipoNotificacion.Error,
        });
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  onCambioSubida(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.cargandoImg = true;
        break;
      case 'done':
        this.archivoService.convertirABase64(
          info.file!.originFileObj!,
          (img: string) => {
            this.cargandoImg = false;
            this.imgCategoria = img;
          }
        );
        break;
      case 'error':
        this.notificacionService.mostrar({
          mensaje: 'Error al subir la imagen.',
          tipo: TipoNotificacion.Error,
        });
        this.cargandoImg = false;
        break;
    }
  }
  private unaRespuestaSeleccionadaValidator(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const valorForm = (form as FormGroup<PreguntaCreacionFG>).value;
      return !valorForm.respuestas!.some((respuesta) => respuesta.esCorrecta) //No hay ninguna respuesta correcta seleccionada
        ? { noRespuestaSeleccionada: true }
        : null;
    };
  }
}
