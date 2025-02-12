import { Component } from '@angular/core';
import { ChatListComponent } from '../chat-list/chat-list.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { ChatScreenComponent } from '../chat-screen/chat-screen.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MatSidenavModule, SidebarComponent ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  chats: Chat[] = [
    { id: 1, name: 'Amor ❤️', lastMessage: 'O que resolve dor de estômago?' },
    { id: 2, name: 'Programar', lastMessage: '000201010212...' }
  ];

  selectedChat: Chat | null = null;

  onChatSelected(chat: Chat) {
    this.selectedChat = chat;
  }
}
