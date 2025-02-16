import { Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth.guard';
import { ChatComponent } from './chat/chat/chat.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'chat', component: ChatComponent, canActivate: [authGuard] },
    { path: 'contact', component: ContactComponent, canActivate: [authGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard], data: { requiresAdmin: true } },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
