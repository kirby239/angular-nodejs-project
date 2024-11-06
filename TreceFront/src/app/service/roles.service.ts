import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private baseUrl = environment.HOST2 + 'roles';

  constructor(private http: HttpClient,
    private mensaje: MensajeService
  ) { }
  // Listar todos los rolest
  listRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/list`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => this.mensaje.MostrarMensaje(error.error['message']));
  }
}
