import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, MessageCircle, CircleUserRound, LayoutDashboard, Settings } from 'lucide-angular';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MatSidenavModule, SidebarComponent, MatFormFieldModule, MatListModule, CommonModule, MatToolbarModule, FormsModule, LucideAngularModule, MatInputModule ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  readonly MessageCircle  = MessageCircle ;
  readonly CircleUserRound   = CircleUserRound  ;
  readonly LayoutDashboard   = LayoutDashboard  ;
  readonly Settings   = Settings  ;

  conversas = [
    {
      nome: 'João',
      ultimaMensagem: 'Como você está?',
      mensagens: [
        { texto: 'Oi, tudo bem?', tipo: 'enviado' },
        { texto: 'Como você está?', tipo: 'recebido' }
      ]
    },
    {
      nome: 'Maria',
      ultimaMensagem: 'Legal!',
      mensagens: [
        { texto: 'E aí, novidades?', tipo: 'recebido' },
        { texto: 'Sim, várias!', tipo: 'enviado' }
      ]
    }
  ];

  conversaAtual: any;
  novaMensagem: string = '';

  ngOnInit(): void {
    // Seleciona a primeira conversa por padrão
    this.conversaAtual = this.conversas[0];
  }

  openChat(conversa: any) {
    this.conversaAtual = conversa;
  }

  enviarMensagem() {
    if (this.novaMensagem.trim()) {
      this.conversaAtual.mensagens.push({
        texto: this.novaMensagem,
        tipo: 'enviado'
      });
      this.novaMensagem = '';
    }
  }
}