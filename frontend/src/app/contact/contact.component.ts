import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule,
  MessageCircle,
  CircleUserRound,
  LayoutDashboard,
  Settings,
  PlusCircle
} from 'lucide-angular';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-contact',
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
    MatInputModule, 
    MatButtonModule
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

  // Contacts array
  contacts = [
    {
      name: 'Warehouse 11',
      description: '34999268588',
      source: 'Telegram'
    },
    {
      name: 'Cayo Garcia',
      description: 'cayo@gmail.com',
      source: 'Gmail'
    }
  ];

  selectedContact: any = null;
  showForm = false;

  ngOnInit(): void {
    // Optionally, select the first contact for editing:
    // this.openContactForm(this.contacts[0]);
  }

  openContactForm(contact: any) {
    // Create a copy for editing to avoid direct two-way binding on the array
    this.selectedContact = { ...contact };
    this.showForm = true;
  }

  openNewContactForm() {
    // Open form with blank fields for a new contact
    this.selectedContact = {
      name: '',
      description: '',
      source: ''
    };
    this.showForm = true;
  }

  saveContact() {
    // If contact exists (by name), update; otherwise, add as new contact
    const index = this.contacts.findIndex(c => c.name === this.selectedContact.name);
    if (index !== -1) {
      this.contacts[index] = { ...this.selectedContact };
    } else {
      this.contacts.push({ ...this.selectedContact });
    }
    this.closeForm();
  }

  deleteContact() {
    // Remove contact from the list
    this.contacts = this.contacts.filter(c => c.name !== this.selectedContact.name);
    this.closeForm();
  }

  closeForm() {
    this.selectedContact = null;
    this.showForm = false;
  }
}
