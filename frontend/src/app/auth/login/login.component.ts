import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LucideAngularModule, Headset } from 'lucide-angular';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatButtonModule, MatInputModule, MatCheckboxModule, LucideAngularModule, MatDialogModule], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  readonly Phone  = Headset;
  
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog
  ) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe(response => {
      if (response.access_token) {
        localStorage.setItem('token', response.access_token);
        this.router.navigate(['/chat']);
      }
    }, error => {
      console.error('Login failed', error);
      this.dialog.open(ErrorDialogComponent, {
        width: '300px'
      });
    });
  }
}
