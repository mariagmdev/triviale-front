import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { TipoNotificacion } from 'src/app/enums/tipo-notificacion/tipo-notificacion';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificacionService } from 'src/app/services/notificacion/notificacion.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  @Input() esVisible: boolean;
  @Output() esVisibleChange = new EventEmitter<boolean>();
  @Output() abrirInicioSesion = new EventEmitter<void>();

  form: FormGroup;

  constructor(
    private authService: AuthService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private notificacionService: NotificacionService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        nombre: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(32),
        ]),
        clave: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(16),
          Validators.pattern(/\.*/),
        ]),
        clave2: new FormControl('', [Validators.required]),
      },
      [this.claveConcuerdanValidator()]
    );
  }

  onRegistrarse() {
    this.recaptchaV3Service.execute('importantAction').subscribe((token) => {
      this.authService.verificarRecaptcha(token).subscribe((esValido) => {
        if (esValido) {
          this.authService.registrar(this.form.value).subscribe(() => {
            this.onCancelar();
          });
        } else {
          this.notificacionService.mostrar({
            mensaje: 'Error en el captcha',
            tipo: TipoNotificacion.Error,
          });
        }
      });
    });
  }

  onCancelar(): void {
    this.esVisible = false;
    this.esVisibleChange.emit(this.esVisible);
  }

  onAbrirInicioSesion(): void {
    this.onCancelar();
    this.abrirInicioSesion.emit();
  }

  private claveConcuerdanValidator(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const valorForm = form.value;

      if (!valorForm.clave) {
        return null;
      }

      return valorForm.clave != valorForm.clave2
        ? { clavesNoConcuerdan: true }
        : null;
    };
  }
}
