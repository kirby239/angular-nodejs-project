import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MensajeService } from './mensaje.service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private baseUrl = environment.HOST2;

  constructor(private http: HttpClient, private mensaje: MensajeService) { }

  // Crear un nuevo usuario
  forgotpass(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}forgot-password`, body).pipe(
      catchError(this.handleError.bind(this))
    );
  }
  newPassword(body: any): Observable<any> {
    return this.http.put(`${this.baseUrl}new-password`, body).pipe(
      catchError(this.handleError.bind(this))
    );
  }
  private handleError(error: HttpErrorResponse) {
    return throwError(this.mensaje.MostrarMensaje(error.error['message']));
  }
}
