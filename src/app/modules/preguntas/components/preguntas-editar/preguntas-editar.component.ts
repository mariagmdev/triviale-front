import {
  Component,
  Input,
  OnChanges,
  OnInit,
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
import { TipoNotificacion } from 'src/app/enums/tipo-notificacion/tipo-notificacion';
import { Categoria } from 'src/app/models/categoria/categoria';
import { PreguntaCreacion } from 'src/app/models/pregunta/pregunta-creacion';
import { PreguntaCreacionFG } from 'src/app/models/pregunta/pregunta-creacion-fg';
import { PreguntaEdicion } from 'src/app/models/pregunta/pregunta-edicion';
import { PreguntaEdicionFG } from 'src/app/models/pregunta/pregunta-edicion-fg';
import { RespuestaCreacion } from 'src/app/models/respuesta/respuesta-creacion';
import { RespuestaCreacionFG } from 'src/app/models/respuesta/respuesta-creacion-fg';
import { RespuestaEdicion } from 'src/app/models/respuesta/respuesta-edicion';
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
  form: FormGroup<PreguntaEdicionFG>;
  categorias: Categoria[];
  pregunta: PreguntaEdicion;

  constructor(
    private categoriaService: CategoriaService,
    private preguntaService: PreguntaService,
    private notificacionService: NotificacionService
  ) {}

  ngOnInit(): void {
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

    this.categoriaService.listar().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id'] && this.id) {
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
      });
    }
  }

  getRespuestasFormArray(): FormArray {
    return this.form.controls['respuestas'] as FormArray; //no es un cast en este caso, solo es una indicación de su tipo
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
    const pregunta: PreguntaEdicion = {
      ...this.pregunta,
      titulo: valorFormValido.titulo!,
      idCategoria: valorFormValido.idCategoria!,
      nombreCategoria: valorFormValido.nombreCategoria!,
      respuestas: valorFormValido.respuestas!.map(
        (respuesta, i): RespuestaEdicion => ({
          ...this.pregunta.respuestas[i],
          titulo: respuesta.titulo!,
          esCorrecta: respuesta.esCorrecta!,
        })
      ),
    };
    this.preguntaService.modificar(this.id, pregunta).subscribe(() => {
      this.notificacionService.mostrar({
        mensaje: 'Pregunta guardada correctamente.',
        tipo: TipoNotificacion.Exito,
      });
    });
  }

  onCambioEsCorrecta(esCorrecta: boolean, i: number): void {
    this.getRespuestasFormArray().controls.forEach((respuesta) => {
      respuesta.patchValue({ esCorrecta: false });
    });
    this.getRespuestasFormArray().controls[i].patchValue({
      esCorrecta: esCorrecta,
    });
    this.form.markAsDirty();
  }

  onCambioCategoria(idCategoria: number): void {
    const catControl = this.form.controls['nombreCategoria'];
    if (idCategoria === 0) {
      catControl.addValidators(Validators.required);
    } else {
      catControl.removeValidators(Validators.required);
    }
    this.form.patchValue({ idCategoria: idCategoria });
    this.form.markAsDirty();
    this.form.updateValueAndValidity();
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
