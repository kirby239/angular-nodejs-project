import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SeguridadComponent } from '../components/seguridad/seguridad.component';
import { UsuariosComponent } from '../components/seguridad/usuarios/usuarios.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SeguridadComponent,
    UsuariosComponent
  ],
  exports: [RouterModule],
})
export class SeguridadModule { }
