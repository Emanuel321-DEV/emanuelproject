import { Routes } from '@angular/router';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ChatScreenComponent } from './chat/chat-screen/chat-screen.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'chat', component: ChatScreenComponent },
    { path: 'contacts', component: ContactListComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
