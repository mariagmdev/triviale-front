import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss'],
})
export class InicioSesionComponent implements OnInit {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private recaptchaV3Service: ReCaptchaV3Service
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

  onSubmit() {
    this.recaptchaV3Service.execute('importantAction').subscribe((token) => {
      this.authService.verificarRecaptcha(token).subscribe((esValido) => {
        if (esValido) {
          this.authService.iniciarSesion(this.form.value).subscribe(() => {
            console.log('Trinity estamos dentro');
          });
        } else {
          alert('Eres un robot.');
        }
      });
    });
  }
}
