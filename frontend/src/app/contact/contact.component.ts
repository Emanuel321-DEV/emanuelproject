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

import { ContactService, Contact } from '../services/contact.service';

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

  readonly MessageCircle = MessageCircle;
  readonly CircleUserRound = CircleUserRound;
  readonly LayoutDashboard = LayoutDashboard;
  readonly Settings = Settings;
  readonly Plus = PlusCircle;
  readonly Search = Search;
  readonly ArrowLeft = ArrowLeft;

  contacts: Contact[] = [];
  searchTerm: string = '';
  showForm: boolean = false;
  selectedContact: Contact | null = null;

  isDesktop = true;
  isContactOpen = false;
  sidebarOpen: boolean = false;

  constructor(
    private router: Router,
    private chatService: ChatService,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.onResize();
    this.loadContacts();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isDesktop = window.innerWidth > 768;
    if (this.isDesktop) {
      this.isContactOpen = false;
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  get filteredContacts() {
    const term = this.searchTerm.toLowerCase();
    return this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(term) ||
      contact.description.toLowerCase().includes(term) ||
      contact.source.toLowerCase().includes(term)
    );
  }

  loadContacts() {
    this.contactService.getContacts().subscribe({
      next: (data) => this.contacts = data,
      error: (err) => console.error('Erro ao carregar contatos', err)
    });
  }

  openNewContactForm() {
    this.selectedContact = { name: '', description: '', source: '', phone: '' };
    this.showForm = true;
    if (!this.isDesktop) {
      this.isContactOpen = true;
    }
  }

  openContactForm(contact: Contact) {
    this.selectedContact = { ...contact };
    this.showForm = true;
    if (!this.isDesktop) {
      this.isContactOpen = true;
    }
  }

  saveContact() {
    if (!this.selectedContact) return;
    if (this.selectedContact._id) {
      this.contactService.updateContact(this.selectedContact._id, this.selectedContact).subscribe({
        next: (updatedContact) => {
          const index = this.contacts.findIndex(c => c._id === updatedContact._id);
          if (index !== -1) {
            this.contacts[index] = updatedContact;
          }
          this.closeContactForm();
        },
        error: (err) => console.error('Erro ao atualizar contato', err)
      });
    } else {
      this.contactService.createContact(this.selectedContact).subscribe({
        next: (newContact) => {
          this.contacts.push(newContact);
          this.closeContactForm();
        },
        error: (err) => console.error('Erro ao criar contato', err)
      });
    }
  }

  deleteContact() {
    if (!this.selectedContact || !this.selectedContact._id) return;
    this.contactService.deleteContact(this.selectedContact._id).subscribe({
      next: () => {
        this.contacts = this.contacts.filter(c => c._id !== this.selectedContact!._id);
        this.closeContactForm();
      },
      error: (err) => console.error('Erro ao deletar contato', err)
    });
  }

  closeContactForm() {
    this.showForm = false;
    this.selectedContact = null;
    if (!this.isDesktop) {
      this.isContactOpen = false;
    }
  }

  startConversation() {
    if (!this.selectedContact) return;

    let conversations = this.chatService.getConversations();
    let conversation = conversations.find(conv => conv.name === this.selectedContact!.name);

    if (!conversation) {
      conversation = {
        name: this.selectedContact.name,
        lastMessage: '',
        resolved: false,
        image: 'user.jpg',
        unreadMessages: 0,
        messages: []
      };
      conversations.push(conversation);
      this.chatService.setConversations(conversations);
    }

    this.router.navigate(['/chat'], {
      queryParams: { contactName: this.selectedContact.name }
    });
  }
}
