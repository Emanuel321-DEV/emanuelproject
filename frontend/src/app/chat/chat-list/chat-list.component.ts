import { Component,  EventEmitter, Input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
}

@Component({
  selector: 'app-chat-list',
  imports: [
    MatToolbarModule,
    MatListModule 
  ],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss'
})
export class ChatListComponent {
  @Input() chats: Chat[] = [];
  @Output() chatSelected = new EventEmitter<Chat>();

  selectChat(chat: Chat) {
    this.chatSelected.emit(chat);
  }
}
