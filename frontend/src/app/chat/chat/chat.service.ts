import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private conversationsSource = new BehaviorSubject<any[]>([
    {
      name: 'João Carlos',
      lastMessage: 'Estou bem e você ?',
      resolved: true,
      unreadMessages: 3,
      messages: [
        { text: 'Hi, I am fine!', type: 'sent' },
        { text: 'Estou bem e você ?', type: 'received' }
      ]
    },
    {
      name: 'Maria Antônia',
      lastMessage: 'Great!',
      resolved: false,
      unreadMessages: 2,
      messages: [
        { text: 'Any updates?', type: 'received' },
        { text: 'Yes, several!', type: 'sent' }
      ]
    },
    {
      name: 'João Carlos',
      lastMessage: 'Estou bem e você ?',
      resolved: true,
      unreadMessages: 3,
      messages: [
        { text: 'Hi, I am fine!', type: 'sent' },
        { text: 'Estou bem e você ?', type: 'received' }
      ]
    },

    {
      name: 'João Carlos',
      lastMessage: 'Estou bem e você ?',
      resolved: true,
      unreadMessages: 3,
      messages: [
        { text: 'Hi, I am fine!', type: 'sent' },
        { text: 'Estou bem e você ?', type: 'received' }
      ]
    },

    {
      name: 'João Carlos',
      lastMessage: 'Estou bem e você ?',
      resolved: true,
      unreadMessages: 3,
      messages: [
        { text: 'Hi, I am fine!', type: 'sent' },
        { text: 'Estou bem e você ?', type: 'received' }
      ]
    },

    {
      name: 'João Carlos',
      lastMessage: 'Estou bem e você ?',
      resolved: true,
      unreadMessages: 3,
      messages: [
        { text: 'Hi, I am fine!', type: 'sent' },
        { text: 'Estou bem e você ?', type: 'received' }
      ]
    },

    {
      name: 'João Carlos',
      lastMessage: 'Estou bem e você ?',
      resolved: true,
      unreadMessages: 3,
      messages: [
        { text: 'Hi, I am fine!', type: 'sent' },
        { text: 'Estou bem e você ?', type: 'received' }
      ]
    },

    {
      name: 'João Carlos',
      lastMessage: 'Estou bem e você ?',
      resolved: true,
      unreadMessages: 3,
      messages: [
        { text: 'Hi, I am fine!', type: 'sent' },
        { text: 'Estou bem e você ?', type: 'received' }
      ]
    },

    {
      name: 'João Carlos',
      lastMessage: 'Estou bem e você ?',
      resolved: true,
      unreadMessages: 3,
      messages: [
        { text: 'Hi, I am fine!', type: 'sent' },
        { text: 'Estou bem e você ?', type: 'received' }
      ]
    },

    {
      name: 'João Carlos',
      lastMessage: 'Estou bem e você ?',
      resolved: true,
      unreadMessages: 3,
      messages: [
        { text: 'Hi, I am fine!', type: 'sent' },
        { text: 'Estou bem e você ?', type: 'received' }
      ]
    },

  ]);

  private unreadCount = new BehaviorSubject<number>(0);

  conversations$ = this.conversationsSource.asObservable();

  constructor() {
    this.unreadCount.next(this.getTotalUnreadMessages());
  }

  
  getConversations(): any[] {
    return this.conversationsSource.value;
  }

  setConversations(newConversations: any[]): void {
    this.conversationsSource.next(newConversations);
    this.unreadCount.next(this.getTotalUnreadMessages());
  }

  
  getTotalUnreadMessages(): number {
    return this.conversationsSource.value.reduce(
      (acc, conv) => acc + (conv.unreadMessages || 0),
      0
    );
  }

  
  getUnreadMessagesCount(): Observable<number> {
    return this.unreadCount.asObservable();
  }

  
  openConversation(index: number) {
    const updated = this.getConversations();
    updated[index].unreadMessages = 0;
    this.setConversations(updated);
  }

  
  updateConversation(updatedConversation: any): void {
    const currentConversations = this.getConversations();
    const index = currentConversations.findIndex(
      conv => conv.name === updatedConversation.name
    );
    if (index !== -1) {
      currentConversations[index] = updatedConversation;
      this.setConversations(currentConversations);
    }
  }
  
  receiveMessage(index: number, text: string) {
    const updated = this.getConversations();
    updated[index].messages.push({ text, type: 'received' });
    updated[index].unreadMessages++;
    this.setConversations(updated);
  }
}
