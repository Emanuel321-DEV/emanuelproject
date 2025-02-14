import { Component } from '@angular/core';
import { RouterModule, RouterLinkActive, Router } from '@angular/router';
import { LucideAngularModule, MessageCircle, CircleUserRound, LayoutDashboard, LogOut } from 'lucide-angular';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-sidebar',
  imports: [LucideAngularModule, RouterModule, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  readonly MessageCircle  = MessageCircle ;
  readonly CircleUserRound   = CircleUserRound  ;
  readonly LayoutDashboard   = LayoutDashboard  ;
  readonly LogOut   = LogOut  ;

  confirmLogout(event: Event): void {
    event.preventDefault(); // Evita que o link recarregue a página
    
    const shouldLogout = window.confirm('Tem certeza que deseja sair?');
    
    if (shouldLogout) {
      this.authService.logout();
      this.router.navigate(['/login']); // Redireciona para a página de login
    }
  }

}
