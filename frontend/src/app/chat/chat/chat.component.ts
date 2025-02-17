import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  LucideAngularModule,
  MessageCircle,
  CircleUserRound,
  LayoutDashboard,
  Settings,
  Search,
  Check,
  Send,
  ArrowLeft
} from 'lucide-angular';
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
  readonly Check = Check;
  readonly Send = Send;
  readonly ArrowLeft = ArrowLeft;

  searchTerm: string = '';
  filter: 'all' | 'pending' | 'resolved' = 'all';

  conversations: any[] = [];
  currentConversation: any;
  newMessage: string = '';

  sidebarOpen = false;
  isMobileView = false;
  showChat = false;

  contactName: string | null = null;

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.contactName = params['contactName'] || null;
    });

    this.chatService.conversations$.subscribe((convs) => {
      this.conversations = convs;
      if (!this.currentConversation && convs.length > 0) {
        if (this.contactName) {
          const conv = convs.find(c =>
            c.name.toLowerCase() === this.contactName!.toLowerCase()
          );
          if (conv) {
            this.openChat(conv);
          } else {
            this.currentConversation = convs[0];
          }
        } else {
          this.currentConversation = convs[0];
        }
      }
    });
    this.checkIfMobile();
    window.addEventListener('resize', () => this.checkIfMobile());
    this.simulateIncomingMessages();
  }

  checkIfMobile() {
    this.isMobileView = window.innerWidth <= 768;
    if (this.isMobileView && !this.currentConversation) {
      this.showChat = false;
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
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
    if (this.isMobileView) {
      this.showChat = true;
    }
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.currentConversation.messages.push({
        text: this.newMessage,
        type: 'sent'
      });
      this.currentConversation.lastMessage = this.newMessage;
      this.chatService.updateConversation(this.currentConversation);
      const conversationRef = this.currentConversation;
      this.newMessage = '';

      setTimeout(() => {
        const fakeResponse = this.getFakeResponse();
        conversationRef.messages.push({
          text: fakeResponse,
          type: 'received'
        });
        conversationRef.lastMessage = fakeResponse;
        if (this.currentConversation.name !== conversationRef.name) {
          conversationRef.unreadMessages++;
        }
        this.chatService.updateConversation(conversationRef);
        this.playNotificationSound();
      }, 10000);
    }
  }

  onResolve(currentConversation: any) {
    if (!currentConversation.resolved) {
      const updatedConversation = { ...currentConversation, resolved: true };
      updatedConversation.messages.push({
        text: 'O chat foi finalizado com sucesso',
        type: 'system'
      });
      updatedConversation.lastMessage = 'O chat foi finalizado com sucesso';

      this.currentConversation = updatedConversation;
      this.chatService.updateConversation(updatedConversation);
    }
  }

  getFakeResponse(): string {
    const responses = [
      'Olá, tudo bem?',
      'Entendi, pode continuar...',
      'Interessante, me conte mais!',
      'Obrigado por compartilhar! Meu amigo'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  simulateIncomingMessages() {
    setInterval(() => {
      if (this.conversations.length > 0) {
        const randomIndex = Math.floor(Math.random() * this.conversations.length);
        const conv = this.conversations[randomIndex];
        const fakeMessage = this.getFakeResponse();
        
        if (conv.resolved) {
          conv.resolved = false;
        }
        
        conv.messages.push({
          text: fakeMessage,
          type: 'received'
        });
        conv.lastMessage = fakeMessage;
        if (this.currentConversation?.name !== conv.name) {
          conv.unreadMessages++;
        }
        this.chatService.updateConversation(conv);
        this.playNotificationSound();
      }
    }, 10000);
  }

  playNotificationSound() {
    const audio = new Audio('assets/notification.mp3');
    audio.load();
    audio.play().catch(err => {
      console.error('Erro ao tocar o som:', err);
    });
  }
}
