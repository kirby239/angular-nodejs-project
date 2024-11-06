import { Component } from '@angular/core';
import { LoginModule } from '../../../modules/login.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { MensajeService } from '../../../service/mensaje.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ForgotPasswordComponent } from '../../forgot-password/forgot-password.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private mensaje: MensajeService,
    private dialog: MatDialog,

  ) {
  }
  ngOnInit(): void {
    this.form();
  }
  form() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  signIn() {
    const { username, password } = this.loginForm.value
    if (this.loginForm.valid) {
      this.authService.login(username, password).subscribe(lo => {

        sessionStorage.setItem('token', lo.token);
        sessionStorage.setItem('rolId', lo.rolId);
        sessionStorage.setItem('username', username)
        this.mensaje.MostrarMensaje('Bienvenido : ' + username)
        this.router.navigate(['/home']);
      })
    }
  }
  forgotPassword() {
    if (this.loginForm.get('username').invalid) return this.mensaje.MostrarMensaje('ingrese su username')

    const dialogCrear = this.dialog.open(ForgotPasswordComponent, {
      width: '25%',
      disableClose: true,
      data: {
        username: this.loginForm.get('username').value
      }
    });
    dialogCrear.afterClosed().subscribe(data => {
      if (data == undefined) return;
    })
  }
  signUp() {
    this.router.navigate(['/auth/register']);
  }
}
