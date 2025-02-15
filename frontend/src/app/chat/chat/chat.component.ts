import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, MessageCircle, CircleUserRound, LayoutDashboard, Settings, Search } from 'lucide-angular';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    MatSidenavModule,
    SidebarComponent,
    MatFormFieldModule,
    MatListModule,
    CommonModule,
    MatToolbarModule,
    FormsModule,
    LucideAngularModule,
    MatInputModule
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  readonly MessageCircle = MessageCircle;
  readonly CircleUserRound = CircleUserRound;
  readonly LayoutDashboard = LayoutDashboard;
  readonly Settings = Settings;
  readonly Search = Search;

  
  searchTerm: string = '';

  filter: 'all' | 'pending' | 'resolved' = 'all';

  conversations: any[] = [];
  currentConversation: any;
  newMessage: string = '';

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.conversations$.subscribe((convs) => {
      this.conversations = convs;
      if (!this.currentConversation && convs.length > 0) {
        this.currentConversation = convs[0];
      }
    });
  }

  get filteredConversations() {
    return this.conversations
      .filter(conv => {
        if (this.filter === 'pending') return !conv.resolved;
        if (this.filter === 'resolved') return conv.resolved;
        return true;
      })
      .filter(conv =>
        conv.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
  }

  openChat(conversation: any) {
    this.currentConversation = conversation;
    conversation.unreadMessages = 0;
    this.chatService.updateConversation(conversation);
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.currentConversation.messages.push({
        text: this.newMessage,
        type: 'sent'
      });
      this.currentConversation.lastMessage = this.newMessage;
      this.chatService.updateConversation(this.currentConversation);
      this.newMessage = '';
    }
  }
  onResolve() {
  }

}
