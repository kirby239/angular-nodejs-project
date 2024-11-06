import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = environment.HOST;

  constructor(protected http: HttpClient, public mensaje: MensajeService) { }
  login(username: string, password: string): Observable<any> {
    return this.http.post(this.URL + '/login', { username, password }).pipe(
      catchError(this.handleError.bind(this))
    );
  }
  register(username: string, password: string, email: string, name: string): Observable<any> {
    return this.http.post(this.URL + '/register', { username, password, email, name }).pipe(
      catchError(this.handleError.bind(this))
    );
  }
  private handleError(error: HttpErrorResponse) {
    return throwError(this.mensaje.MostrarMensaje(error.error['message']));
  }
}
