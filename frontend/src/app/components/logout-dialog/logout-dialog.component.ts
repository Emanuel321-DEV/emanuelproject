import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-logout-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss']
})
export class LogoutDialogComponent {

  constructor(public dialogRef: MatDialogRef<LogoutDialogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);  
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
