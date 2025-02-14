import { Component } from '@angular/core';
import { AuthService } from "../auth.service";
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LucideAngularModule, Headset } from 'lucide-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatButtonModule, MatInputModule, MatCheckboxModule, LucideAngularModule], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  readonly Phone  = Headset;

  onLogin() {
    this.authService.login(this.email, this.password).subscribe(response => {
      console.log(response);
      if (response.access_token) {
        localStorage.setItem('token', response.access_token);
        this.router.navigate(['/chat']);
      }
    }, error => {
      console.error('Login failed', error);
    });
  }
}
