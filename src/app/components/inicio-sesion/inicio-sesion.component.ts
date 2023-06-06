import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { TipoNotificacion } from 'src/app/enums/tipo-notificacion/tipo-notificacion';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificacionService } from 'src/app/services/notificacion/notificacion.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss'],
})
export class InicioSesionComponent implements OnInit {
  @Input() esVisible: boolean;
  @Output() esVisibleChange = new EventEmitter<boolean>();
  @Output() abrirRegistro = new EventEmitter<void>();

  form: FormGroup;

  constructor(
    private authService: AuthService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private notificacionService: NotificacionService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
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
    });
  }

  onIniciarSesion() {
    this.recaptchaV3Service.execute('importantAction').subscribe((token) => {
      this.authService.verificarRecaptcha(token).subscribe((esValido) => {
        if (esValido) {
          this.authService.iniciarSesion(this.form.value).subscribe(() => {
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

  onAbrirRegistro(): void {
    this.onCancelar();
    this.abrirRegistro.emit();
  }
}
