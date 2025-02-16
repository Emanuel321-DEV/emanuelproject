import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatComponent } from './chat/chat.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ChatComponent,
  ],
  exports: [ChatComponent]
})

export class ChatModule { }
