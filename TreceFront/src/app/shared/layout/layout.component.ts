import { Component } from '@angular/core';
import { LayoutModule } from '../../modules/layout.module';
import { MensajeService } from '../../service/mensaje.service';
import { Router } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [LayoutModule, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  Sidenav: boolean = false;
  showSeguridad: boolean = false
  isExpanded = true;
  isShowing = false;
  username = sessionStorage.getItem('username')
  constructor(private router: Router,
    private mensaje: MensajeService
  ) { }
  closeSession() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('rolId');
    sessionStorage.removeItem('username');
    this.mensaje.MostrarMensaje('Vuelve pronto');
    this.router.navigate(['/auth/login']);

  }
}
