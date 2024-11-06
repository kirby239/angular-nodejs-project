import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MensajeService } from './mensaje.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private baseUrl = environment.HOST2;

  constructor(private http: HttpClient, private mensaje: MensajeService) { }

  // Crear un nuevo usuario
  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, userData).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  // Modificar un usuario existente
  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, userData).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  // Eliminar un usuario
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  // Listar todos los usuarios
  listUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}list`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  // Visualizar un usuario por ID
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get/${id}`).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(this.mensaje.MostrarMensaje(error.error['message']));
  }
}
