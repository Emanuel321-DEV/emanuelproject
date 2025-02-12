import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  standalone: true,
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'frontend';
  constructor(private router: Router) {}

  shouldShowSidebar(): boolean {
    return this.router.url !== '/login';
  }
  
}
