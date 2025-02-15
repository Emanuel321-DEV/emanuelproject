import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { ChatService } from '../chat/chat/chat.service';

import {
  LucideAngularModule,
  MessageCircle,
  CircleUserRound,
  LayoutDashboard,
  Settings,
  PlusCircle,
  Search,
  ArrowLeft
} from 'lucide-angular';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    SidebarComponent,
    LucideAngularModule
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  // Ícones
  readonly MessageCircle = MessageCircle;
  readonly CircleUserRound = CircleUserRound;
  readonly LayoutDashboard = LayoutDashboard;
  readonly Settings = Settings;
  readonly Plus = PlusCircle;
  readonly Search = Search;
  readonly ArrowLeft = ArrowLeft;

  contacts: any[] = [
    {
      name: 'Warehouse 11',
      description: '34999268588',
      source: 'Telegram'
    },
    {
      name: 'Cayo Garcia',
      description: 'cayo@gmail.com',
      source: 'Gmail'
    },
  ];

  searchTerm: string = '';

  showForm: boolean = false;
  selectedContact: any = null;

  isDesktop = true;      // se a largura da janela > 768px
  isContactOpen = false; // no mobile, indica se o formulário (detalhes) está aberto

  // Controle da sidebar
  sidebarOpen: boolean = false;

  constructor(
    private router: Router,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.onResize(); // Verifica tamanho inicial
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.isDesktop = window.innerWidth > 768;
    if (this.isDesktop) {
      this.isContactOpen = false;
    }
  }

  // Abre/fecha sidebar (mobile)
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  // Filtro de contatos
  get filteredContacts() {
    const term = this.searchTerm.toLowerCase();
    return this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(term) ||
      contact.description.toLowerCase().includes(term) ||
      contact.source.toLowerCase().includes(term)
    );
  }

  // Novo contato
  openNewContactForm() {
    this.selectedContact = { name: '', description: '', source: '' };
    this.showForm = true;
    if (!this.isDesktop) {
      this.isContactOpen = true;
    }
  }

  // Editar contato
  openContactForm(contact: any) {
    this.selectedContact = { ...contact };
    this.showForm = true;
    if (!this.isDesktop) {
      this.isContactOpen = true;
    }
  }

  // Salvar contato
  saveContact() {
    const index = this.contacts.findIndex(c => c.name === this.selectedContact.name);
    if (index !== -1) {
      // Atualiza contato existente
      this.contacts[index] = { ...this.selectedContact };
    } else {
      // Novo contato
      this.contacts.push({ ...this.selectedContact });
    }
    this.closeContactForm();
  }

  // Excluir contato
  deleteContact() {
    this.contacts = this.contacts.filter(c => c.name !== this.selectedContact.name);
    this.closeContactForm();
  }

  // Fecha formulário (botão de voltar no mobile)
  closeContactForm() {
    this.showForm = false;
    this.selectedContact = null;
    if (!this.isDesktop) {
      this.isContactOpen = false;
    }
  }

  /**
   * INICIAR CONVERSA:
   *  - Verifica se já existe conversa com esse contato
   *  - Se não existir, cria
   *  - Navega para /chat, passando o nome via queryParams
   */
  startConversation() {
    if (!this.selectedContact) return;

    // Verifica se já existe conversa com esse contato
    const existingConv = this.chatService
      .getConversations()
      .find(conv => conv.name === this.selectedContact.name);

    // Se não existir, cria
    if (!existingConv) {
      const newConv = {
        name: this.selectedContact.name,
        lastMessage: '',
        resolved: false,
        image: 'default-user.png', // Ajuste se quiser outra imagem
        unreadMessages: 0,
        messages: []
      };
      const all = this.chatService.getConversations();
      all.push(newConv);
      this.chatService.setConversations(all);
    }

    // Navega para a tela de chat, passando o nome do contato via queryParams
    this.router.navigate(['/chat'], {
      queryParams: { contactName: this.selectedContact.name }
    });
  }
}
