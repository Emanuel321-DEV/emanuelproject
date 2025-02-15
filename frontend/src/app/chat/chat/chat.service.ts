import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private conversationsSource = new BehaviorSubject<any[]>([
    {
      name: 'John Snow',
      lastMessage: 'Acho melhor não ...',
      resolved: true,
      image: "jon.jpg",
      unreadMessages: 3,
      messages: [
        { text: 'Como está John Snow ?', type: 'sent' },
        { text: 'Estou bem, vou me casar com Daenarys', type: 'received' },
        { text: 'Acho melhor não ...', type: 'sent' },
      ]
    },
    {
      name: 'Arya Stark',
      lastMessage: 'Qual o problema ?!',
      resolved: false,
      image: "arya.jpg",
      unreadMessages: 2,
      messages: [
        { text: 'Oi Arya, como está ?', type: 'sent' },
        { text: 'Estou bem!', type: 'received' },
        { text: 'Estou vendo minha família, estão em um casamento', type: 'received' },
        { text: 'Casamento ?', type: 'sent' },
        { text: 'Sim, na casa Frey!', type: 'received' },
        { text: 'Meu Deus...', type: 'sent' },
        { text: 'O que foi ?!', type: 'received' },
        { text: 'Qual o problema ?!', type: 'received' },
      ]

    },
    {
      name: 'Cersei Lennister',
      lastMessage: 'Estou bem e você ?',
      resolved: true,
      image: "cersei-lennister.jpg",
      unreadMessages: 3,
      messages: [
        { text: 'Hi, I am fine!', type: 'sent' },
        { text: 'Estou bem e você ?', type: 'received' }
      ]
    },

    {
      name: 'Joffrey Barath...',
      lastMessage: 'Estou bem e você ?',
      resolved: true,
      image: "joffrey.png",
      unreadMessages: 3,
      messages: [
        { text: 'Hi, I am fine!', type: 'sent' },
        { text: 'Estou bem e você ?', type: 'received' }
      ]
    },

    {
      name: 'Jorah Mormont',
      lastMessage: 'Estou bem e você ?',
      resolved: true,
      image: "jorah.jpg",
      unreadMessages: 3,
      messages: [
        { text: 'Hi, I am fine!', type: 'sent' },
        { text: 'Estou bem e você ?', type: 'received' }
      ]
    },

    {
      name: 'Little Finger',
      lastMessage: 'Estou bem e você ?',
      resolved: true,
      image: "little-finger.jpg",
      unreadMessages: 3,
      messages: [
        { text: 'Hi, I am fine!', type: 'sent' },
        { text: 'Estou bem e você ?', type: 'received' }
      ]
    },

    {
      name: 'Loras Tyrell',
      lastMessage: 'Estou bem e você ?',
      resolved: true,
      image: "loras.webp",
      unreadMessages: 3,
      messages: [
        { text: 'Hi, I am fine!', type: 'sent' },
        { text: 'Estou bem e você ?', type: 'received' }
      ]
    },

    {
      name: 'Ned Stark',
      lastMessage: 'Estou bem e você ?',
      resolved: true,
      image: "ned-stark.jpg",
      unreadMessages: 3,
      messages: [
        { text: 'Hi, I am fine!', type: 'sent' },
        { text: 'Estou bem e você ?', type: 'received' }
      ]
    },

    {
      name: 'Sansa Stark',
      lastMessage: 'Estou bem e você ?',
      resolved: true,
      image: "sansa.jpg",
      unreadMessages: 3,
      messages: [
        { text: 'Hi, I am fine!', type: 'sent' },
        { text: 'Estou bem e você ?', type: 'received' }
      ]
    },

    {
      name: 'Tyrion Lennister',
      lastMessage: 'Estou bem e você ?',
      resolved: true,
      image: "tiryon-lannister.png",
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
    const updatedConversations = currentConversations.map(conv =>
      conv.name === updatedConversation.name ? updatedConversation : conv
    );
    this.setConversations(updatedConversations);
  }
  
  receiveMessage(index: number, text: string) {
    const updated = this.getConversations();
    updated[index].messages.push({ text, type: 'received' });
    updated[index].unreadMessages++;
    this.setConversations(updated);
  }
}
