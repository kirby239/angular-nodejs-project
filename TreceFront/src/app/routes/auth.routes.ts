import { Routes } from "@angular/router";
import { LoginComponent } from "../components/auth/login/login.component";
import { RegisterComponent } from "../components/auth/register/register.component";

export const authRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    }, {
        path: 'register',
        component: RegisterComponent,
    },
    { path: '**', redirectTo: '/auth/login' },
];