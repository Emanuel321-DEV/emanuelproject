import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent {
  message: string = 'Ocorreu um erro ao tentar fazer login. Verifique suas credenciais e tente novamente';

  constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
