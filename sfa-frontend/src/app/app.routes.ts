import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'login'},

    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'login', loadComponent: () => import('../app/components/user/login/login.component').then((c)=> c.LoginComponent)}
        ]
    },

    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'classic'
        },
        children: [
            {path: 'dashboard', loadComponent: () => import('../app/components/pages/dashboard/dashboard.component').then((c) => c.DashboardComponent)}
        ]
    }
];
