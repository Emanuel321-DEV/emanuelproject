import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatButtonModule, MatInputModule], // Importando Material
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe(response => {
      if (response.token) {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/chat']);
      }
    }, error => {
      console.error('Login failed', error);
    });
  }
}
