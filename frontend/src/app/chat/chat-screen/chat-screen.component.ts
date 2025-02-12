import { Component, Input } from '@angular/core';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
}

interface Message {
  text: string;
  sentByMe: boolean;
}

@Component({
  selector: 'app-chat-screen',
  imports: [
    CommonModule,
    MatCardModule,
    ChatInputComponent,
    SidebarComponent,
    MatToolbarModule
  ],
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.scss']
})
export class ChatScreenComponent {
  @Input() chat: Chat | null = null;
  messages = [
    { text: 'Olá, tudo bem?', sentByMe: true },
    { text: 'Oi! Tudo ótimo, e você?', sentByMe: false },
    { text: 'Estou bem também! 😃', sentByMe: true }
  ];

  handleSendMessage(newMessage: string) {
    this.messages.push({ text: newMessage, sentByMe: true });
  }
}
