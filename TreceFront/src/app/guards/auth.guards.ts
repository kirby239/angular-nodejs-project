import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const privateGuard: CanActivateFn = (route, state) => {

    const token = sessionStorage.getItem('token');
    const router = inject(Router);
    if (token) {
        // Si hay un token, permite el acceso
        return true;
    } else {
        // Si no hay token, deniega el acceso
        router.navigate(['/auth/login']);
        return false
    }
};

export const publicGuard: CanActivateFn = (route, state) => {
    const token = sessionStorage.getItem('token');
    const router = inject(Router);    
    if (token) {
        router.navigate(['/home']);
        return false; // Impide el acceso a la ruta pública
    }
    return true
};