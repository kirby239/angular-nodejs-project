import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MensajeService } from '../../service/mensaje.service';
import { ForgotPasswordService } from '../../service/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  username: string
  constructor(
    private dialogRef: MatDialogRef<ForgotPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private mensajeService: MensajeService,
    private forgot: ForgotPasswordService) { }
  ngOnInit(): void {
    this.username = this.data['username'];

  }
  operar() {
    const body = {
      'username': this.username
    }

    this.forgot.forgotpass(body).subscribe(pass => {
      this.mensajeService.MostrarMensaje(pass['message'])
    })
    this.dialogRef.close();

  }
  cerrar() {
    this.dialogRef.close();
  }
}
