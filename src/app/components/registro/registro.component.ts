import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private recaptchaV3Service: ReCaptchaV3Service
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

  onSubmit() {
    this.recaptchaV3Service.execute('importantAction').subscribe((token) => {
      this.authService.verificarRecaptcha(token).subscribe((esValido) => {
        if (esValido) {
          this.authService.registrar(this.form.value).subscribe(() => {
            console.log('usuario registrado');
          });
        } else {
          alert('Eres un robot.');
        }
      });
    });
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
