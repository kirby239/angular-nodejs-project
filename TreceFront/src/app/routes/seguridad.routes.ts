import { Routes } from "@angular/router";
import { SeguridadComponent } from "../components/seguridad/seguridad.component";
import { UsuariosComponent } from "../components/seguridad/usuarios/usuarios.component";

export const seguridadRoutes: Routes = [
    {
        path: '',
        component: SeguridadComponent,
        children: [
            { path: 'usuarios', component: UsuariosComponent },


        ]
    }
];