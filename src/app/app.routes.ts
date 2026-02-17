import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Dashboard } from './features/dashboard/dashboard';
import { Patient } from './patient/patient';
import { authGuard } from './core/guards/auth-guard';
export const routes: Routes = [
{
    path:'',
    redirectTo:'login',
    pathMatch:'full'
},
{
    path:'login',
    component:Login
},
{
    path:'dashboard',
    canActivate:[authGuard],
    loadComponent:()=>import('./features/dashboard/dashboard').then(m=>m.Dashboard)
},
{
    path:'patient',
    canActivate:[authGuard],
    loadComponent:()=>import('./patient/patient').then(m=>m.Patient)
},
{
 path:'**',
 redirectTo:'login'
}
];
