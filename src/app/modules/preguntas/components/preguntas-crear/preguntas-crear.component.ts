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
import { TipoNotificacion } from 'src/app/enums/tipo-notificacion/tipo-notificacion';
import { Categoria } from 'src/app/models/categoria/categoria';
import { PreguntaCreacion } from 'src/app/models/pregunta/pregunta-creacion';
import { PreguntaCreacionFG } from 'src/app/models/pregunta/pregunta-creacion-fg';
import { RespuestaCreacion } from 'src/app/models/respuesta/respuesta-creacion';
import { RespuestaCreacionFG } from 'src/app/models/respuesta/respuesta-creacion-fg';
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

  constructor(
    private categoriaService: CategoriaService,
    private preguntaService: PreguntaService,
    private notificacionService: NotificacionService
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
  getRespuestasFormArray(): FormArray {
    return this.form.controls['respuestas'] as FormArray; //no es un cast en este caso, solo es una indicación de su tipo
  }

  onCrear(): void {
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
    if (!this.form.valid) {
      return;
    }
    const valorFormValido = this.form.value;
    const pregunta: PreguntaCreacion = {
      titulo: valorFormValido.titulo!,
      idCategoria: valorFormValido.idCategoria!,
      categoria: valorFormValido.categoria!,
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
    const catControl = this.form.controls['categoria'];
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
      const valorForm = (form as FormGroup<PreguntaCreacionFG>).value;
      return !valorForm.respuestas!.some((respuesta) => respuesta.esCorrecta) //No hay ninguna respuesta correcta seleccionada
        ? { noRespuestaSeleccionada: true }
        : null;
    };
  }
}
