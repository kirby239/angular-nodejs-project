import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptorFn, HttpHandlerFn, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MensajeService } from '../service/mensaje.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router); // Usa 'inject' para obtener el Router
    const mensaje = inject(MensajeService)
    const token = sessionStorage.getItem('token');
    if (!token) {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('rolId');
        sessionStorage.removeItem('username');
        return next(req);

    }

    const cloneRequest = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });
    return next(cloneRequest).pipe(
        catchError((err) => {
            if (err.status === 401 || 403) {
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('rolId');
                sessionStorage.removeItem('username');
                router.navigate(['/auth/login']);
                return throwError(() => mensaje.MostrarMensaje(err.error['message']));
            }
            return throwError(() => mensaje.MostrarMensaje(err.error['message']));
        })
    );
}