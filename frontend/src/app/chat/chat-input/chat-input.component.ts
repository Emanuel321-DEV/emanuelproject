import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chat-input',
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss'
})
export class ChatInputComponent {
  @Output() sendMessage = new EventEmitter<string>();
  message: string = '';

  onSend() {
    if (this.message.trim()) {
      this.sendMessage.emit(this.message);
      this.message = '';
    }
  }
}
