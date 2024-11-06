import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MensajeService } from '../../service/mensaje.service';
import { UsuariosService } from '../../service/usuarios.service';
import { UsuariosModel } from '../../model/usuarios';

@Component({
  selector: 'app-dialog-delete',
  standalone: true,
  imports: [],
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.css'
})
export class DialogDeleteComponent {
  datosNuevos: UsuariosModel;
  parametro_busqueda: string;

  constructor(
    private dialogRef: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private mensaje: MensajeService,
    private usuarioService: UsuariosService
  ) { }
  ngOnInit(): void {
    this.datosNuevos = { ...this.data['objeto'] };
    this.parametro_busqueda = this.data['parametro_busqueda']

  }
  operar() {
    this.usuarioService.deleteUser(this.datosNuevos.id).subscribe(de => {
      this.mensaje.MostrarMensaje(de['message'])
      this.cerrar();
    })
  }
  cerrar() {
    this.dialogRef.close(this.parametro_busqueda);
  }
}
