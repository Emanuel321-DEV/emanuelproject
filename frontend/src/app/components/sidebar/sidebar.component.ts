import { Component } from '@angular/core';
import { RouterModule, RouterLinkActive, Router } from '@angular/router';
import { LucideAngularModule, MessageCircle, UserPen, Moon, LogOut } from 'lucide-angular';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-sidebar',
  imports: [LucideAngularModule, RouterModule, RouterLinkActive, CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  readonly MessageCircle  = MessageCircle ;
  readonly CircleUserRound   = UserPen  ;
  readonly LayoutDashboard   = Moon  ;
  readonly LogOut   = LogOut  ;
  
  unreadMessages = 3;

  ngOnInit() {
    this.getUnreadMessages();
  }
  
  getUnreadMessages() {
    setTimeout(() => {
      this.unreadMessages = Math.floor(Math.random() * 10); 
    }, 1000);
  }

  confirmLogout(event: Event): void {
    event.preventDefault();

    const dialogRef = this.dialog.open(LogoutDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }

}
