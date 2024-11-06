import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './guards/auth.guards';

export const routes: Routes = [
    //rutas publicas
    {
        path: 'auth',
        canActivate: [publicGuard],
        loadChildren: () => import('./routes/auth.routes').then((m) => m.authRoutes)
    },
    , {
        path: 'new-password/:token',
        canActivate: [publicGuard],
        loadComponent: () =>
            import('./components/new-password/new-password.component').then((m) => m.NewPasswordComponent)
    },
    //rutas privadas
    {
        path: '',
        canActivate: [privateGuard],
        loadComponent: () => import('./shared/layout/layout.component').then((m) => m.LayoutComponent),
        children: [
            {
                path: 'home',
                loadComponent: () =>
                    import('./components/home/home.component').then((m) => m.HomeComponent)
            },
            {
                path: 'seguridad',
                loadChildren: () =>
                    import('./routes/seguridad.routes').then((m) => m.seguridadRoutes)
            },
            { path: '**', redirectTo: '/home', pathMatch: 'full' },

        ]
    },
    { path: '**', redirectTo: '/auth/login', pathMatch: 'full' },
];