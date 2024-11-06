import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SeguridadModule } from '../../modules/seguridad.module';

@Component({
  selector: 'app-seguridad',
  standalone: true,
  imports: [RouterModule,RouterOutlet,SeguridadModule],
  templateUrl: './seguridad.component.html',
  styleUrl: './seguridad.component.css'
})
export class SeguridadComponent {

}
