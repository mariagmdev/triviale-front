import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { TipoNotificacion } from 'src/app/enums/tipo-notificacion/tipo-notificacion';
import { Categoria } from 'src/app/models/categoria/categoria';
import { PreguntaEdicion } from 'src/app/models/pregunta/pregunta-edicion';
import { PreguntaEdicionFG } from 'src/app/models/pregunta/pregunta-edicion-fg';
import { RespuestaCreacionFG } from 'src/app/models/respuesta/respuesta-creacion-fg';
import { RespuestaEdicion } from 'src/app/models/respuesta/respuesta-edicion';
import { ArchivoService } from 'src/app/services/archivo/archivo.service';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { NotificacionService } from 'src/app/services/notificacion/notificacion.service';
import { PreguntaService } from 'src/app/services/pregunta/pregunta.service';

@Component({
  selector: 'app-preguntas-editar',
  templateUrl: './preguntas-editar.component.html',
  styleUrls: ['./preguntas-editar.component.scss'],
})
export class PreguntasEditarComponent implements OnInit, OnChanges {
  @Input() id: number;
  @Input() esVisible: boolean;
  @Output() esVisibleChange = new EventEmitter<boolean>();
  @Output() refrescar = new EventEmitter<void>();
  form: FormGroup<PreguntaEdicionFG>;
  categorias: Categoria[];
  pregunta?: PreguntaEdicion;
  readonly rutaImg = this.archivoService.ruta;
  cargandoImg: boolean;
  imgCategoria?: string;

  constructor(
    private categoriaService: CategoriaService,
    private preguntaService: PreguntaService,
    private notificacionService: NotificacionService,
    private archivoService: ArchivoService
  ) {}

  ngOnInit(): void {
    this.inicializarForm();
    this.categoriaService.listar().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && this.id) {
      this.pregunta = undefined;
      this.inicializarForm();
      this.preguntaService.obtener(this.id).subscribe((pregunta) => {
        this.pregunta = pregunta;
        this.form.patchValue({
          titulo: pregunta.titulo,
          idCategoria: pregunta.idCategoria,
          nombreCategoria: pregunta.nombreCategoria,
          respuestas: pregunta.respuestas.map((respuesta) => ({
            titulo: respuesta.titulo,
            esCorrecta: respuesta.esCorrecta,
          })),
        });
        this.imgCategoria = pregunta.imgCategoria!;
      });
    }
  }

  onGuardar(): void {
    const valorForm = this.form.value;
    this.form.patchValue({
      ...valorForm,
      titulo: valorForm.titulo?.trim(),
      nombreCategoria: valorForm.nombreCategoria?.trim(),
    });
    this.form.controls.respuestas.controls.forEach((respuestaControl) => {
      respuestaControl.patchValue({
        ...respuestaControl.value,
        titulo: respuestaControl.value.titulo?.trim(),
      });
    });
    this.form.updateValueAndValidity();
    if (!this.form.valid) {
      return;
    }
    const valorFormValido = this.form.value;
    const pregunta = {
      ...this.pregunta,
      titulo: valorFormValido.titulo!,
      idCategoria: valorFormValido.idCategoria!,
      nombreCategoria: valorFormValido.nombreCategoria!,
      imgCategoria: this.imgCategoria,
      respuestas: valorFormValido.respuestas!.map(
        (respuesta, i): RespuestaEdicion => ({
          ...this.pregunta!.respuestas[i],
          titulo: respuesta.titulo!,
          esCorrecta: respuesta.esCorrecta!,
        })
      ),
    } as PreguntaEdicion;
    this.preguntaService.modificar(this.id, pregunta).subscribe(() => {
      this.notificacionService.mostrar({
        mensaje: 'Pregunta guardada correctamente.',
        tipo: TipoNotificacion.Exito,
      });
      this.onCancelar();
      this.refrescar.emit();
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
    const catControl = this.form.controls.nombreCategoria;
    const idCategoria = this.form.value.idCategoria;
    if (idCategoria === 0) {
      catControl.addValidators(Validators.required);
    } else {
      catControl.removeValidators(Validators.required);
    }
    catControl.setValue(null);
    this.imgCategoria = undefined;
    this.form.updateValueAndValidity();
  }

  onCancelar(): void {
    this.esVisible = false;
    this.esVisibleChange.emit(this.esVisible);
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

  inicializarForm(): void {
    this.form = new FormGroup<PreguntaEdicionFG>(
      {
        titulo: new FormControl('', [Validators.required]),
        idCategoria: new FormControl(null, [Validators.required]),
        respuestas: new FormArray<FormGroup<RespuestaCreacionFG>>([]),
        nombreCategoria: new FormControl(''),
        esPublica: new FormControl(false, [Validators.required]),
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
  }

  private unaRespuestaSeleccionadaValidator(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const valorForm = (form as FormGroup<PreguntaEdicionFG>).value;
      return !valorForm.respuestas!.some((respuesta) => respuesta.esCorrecta) //No hay ninguna respuesta correcta seleccionada
        ? { noRespuestaSeleccionada: true }
        : null;
    };
  }
}
