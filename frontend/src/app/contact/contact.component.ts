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

  isDesktop = true;      
  isContactOpen = false; 
  sidebarOpen: boolean = false;

  constructor(
    private router: Router,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.onResize(); 
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
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

  openNewContactForm() {
    this.selectedContact = { name: '', description: '', source: '' };
    this.showForm = true;
    if (!this.isDesktop) {
      this.isContactOpen = true;
    }
  }

  openContactForm(contact: any) {
    this.selectedContact = { ...contact };
    this.showForm = true;
    if (!this.isDesktop) {
      this.isContactOpen = true;
    }
  }

  saveContact() {
    const index = this.contacts.findIndex(c => c.name === this.selectedContact.name);
    if (index !== -1) {
      this.contacts[index] = { ...this.selectedContact };
    } else {
      this.contacts.push({ ...this.selectedContact });
    }
    this.closeContactForm();
  }

  deleteContact() {
    this.contacts = this.contacts.filter(c => c.name !== this.selectedContact.name);
    this.closeContactForm();
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

    
    const existingConv = this.chatService
      .getConversations()
      .find(conv => conv.name === this.selectedContact.name);

    
    if (!existingConv) {
      const newConv = {
        name: this.selectedContact.name,
        lastMessage: '',
        resolved: false,
        image: 'default-user.png', 
        unreadMessages: 0,
        messages: []
      };
      const all = this.chatService.getConversations();
      all.push(newConv);
      this.chatService.setConversations(all);
    }

    
    this.router.navigate(['/chat'], {
      queryParams: { contactName: this.selectedContact.name }
    });
  }
}
