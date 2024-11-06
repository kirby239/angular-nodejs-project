import { Component } from '@angular/core';
import { RegisterModule } from '../../../modules/register.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { MensajeService } from '../../../service/mensaje.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RegisterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private mensaje: MensajeService
  ) {
  }
  ngOnInit(): void {
    this.form();
  }
  form() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required]
    });

  }
  back() {
    this.router.navigate(['/auth/login']);

  }
  signUp() {

    if (this.registerForm.valid) {
      const { username, email, password, name } = this.registerForm.value
      this.authService.register(username, password, email, name).subscribe(re => {
        this.mensaje.MostrarMensaje(re['message'])
        this.router.navigate(['/auth/login']);

      })
    }

  }


}
