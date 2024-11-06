import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ForgotPasswordService } from '../../service/forgot-password.service';
import { MensajeService } from '../../service/mensaje.service';
import { RegisterModule } from '../../modules/register.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [RegisterModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent {
  newform: FormGroup
  token: string = "";
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private forgot: ForgotPasswordService, private router: Router,
    private mensaje: MensajeService) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    if (!this.token) {
      sessionStorage.clear();
      this.router.navigate(['/auth/login']);
    } else {
      sessionStorage.setItem('token', this.token)
    }
    this.form();
  }
  form() {
    this.newform = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

  }
  back() {
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);

  }
  newPasword() {
    const { username, password } = this.newform.value
    const body = {
      "username": username,
      "newPassword": password
    }
    this.forgot.newPassword(body).subscribe(pas => {
      this.mensaje.MostrarMensaje(pas['message'])
      if (pas['message'] == 'new Password changed!') {
        sessionStorage.clear();
        this.router.navigate(['/auth/login']);
      }
    })
  }
}
