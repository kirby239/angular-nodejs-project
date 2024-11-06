import { Component, Inject } from '@angular/core';
import { UsuariosModel } from '../../model/usuarios';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogModule } from '../../modules/dialog.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../service/usuarios.service';
import { RolesService } from '../../service/roles.service';
import { MensajeService } from '../../service/mensaje.service';

@Component({
  selector: 'app-dialog-usuarios',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './dialog-usuarios.component.html',
  styleUrl: './dialog-usuarios.component.css'
})
export class DialogUsuariosComponent {
  constructor(private dialogRef: MatDialogRef<DialogUsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private rolesService: RolesService,
    private mensaje: MensajeService
  ) { }
  usuariosForm: FormGroup
  modo: string;
  parametro_busqueda: string;
  listRoles: any[]
  datosPrincipales: UsuariosModel;
  ngOnInit(): void {
    this.modo = this.data['Modo']
    this.datosPrincipales = this.data['tercero'];
    this.parametro_busqueda = this.data['parametro_busqueda'];
    this.form()
    this.rolesSelect()
  }
  form() {
    this.usuariosForm = this.fb.group({
      username: [this.datosPrincipales?.username, Validators.required],
      email: [this.datosPrincipales?.email, [Validators.required, Validators.email]],
      password: [this.datosPrincipales?.password, Validators.required],
      name: [this.datosPrincipales?.name, Validators.required],
      roleId: [this.datosPrincipales?.roleId, Validators.required],
    });

    if (this.modo == 'view') {
      this.usuariosForm.disable()
    }
    else if (this.modo == 'edit') {
      this.usuariosForm.get('password').disable()
    }
  }

  rolesSelect() {
    this.rolesService.listRoles().subscribe(li => {
      this.listRoles = li
    })
  }
  cerrar() {
    this.dialogRef.close(this.parametro_busqueda);
  }
  save() {
    if (this.usuariosForm.valid) {
      const { username, email, password, name, roleId } = this.usuariosForm.value

      if (this.modo == 'add') {
        this.usuarioService.createUser({ username, email, password, name, roleId }).subscribe(save => {
          this.mensaje.MostrarMensaje(save['message'])
          this.cerrar();
        })
      }
      else if (this.modo == 'edit') {
        this.usuarioService.updateUser(this.datosPrincipales.id, { username, email, password, name, roleId }).subscribe(update => {
          this.mensaje.MostrarMensaje(update['message'])
          this.cerrar();
        })
      }
    }
  }


}
