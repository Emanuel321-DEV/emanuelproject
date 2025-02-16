import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';
import { ChartConfiguration, ChartData } from 'chart.js';
import { ChatService } from '../chat/chat/chat.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    FormsModule,
    NgChartsModule,
    SidebarComponent,
    LucideAngularModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selectedOption: number = 1;
  sidebarOpen = false;
  conversations: any[] = [];

  optionLabels: { [key: number]: string } = {
    1: 'Visão Geral',
    2: 'Usuários Frequentes',
    3: 'Mensagens não lidas'
  };

  isDesktop: boolean = window.innerWidth > 768;
  showDashboardMain: boolean = this.isDesktop;

  readonly ArrowLeft = ArrowLeft;

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Pendentes', 'Resolvidas'],
    datasets: [{
      data: [0, 0], label: 'Visão Geral',
      backgroundColor: ['#ff9800', '#4caf50'],
    }]
  };

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Número de mensagens', backgroundColor: '#2196F3' }
    ]
  };

  public unreadBarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public unreadBarChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Mensagens não lidas', backgroundColor: '#f44336' }
    ]
  };

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.conversations$.subscribe(convs => {
      this.conversations = convs;
      this.updateCharts();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isDesktop = event.target.innerWidth > 768;
    if (this.isDesktop) {
      this.showDashboardMain = true;
    } else {
      this.showDashboardMain = false;
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  selectOption(option: number) {
    this.selectedOption = option;
    if (!this.isDesktop) {
      this.showDashboardMain = true;
    }
  }

  backToList() {
    this.showDashboardMain = false;
  }

  updateCharts() {
    if (this.conversations) {
      const pending = this.conversations.filter(c => !c.resolved).length;
      const resolved = this.conversations.filter(c => c.resolved).length;
      this.pieChartData.datasets[0].data = [pending, resolved];

      this.barChartData.labels = this.conversations.map(c => c.name);
      this.barChartData.datasets[0].data = this.conversations.map(c => c.messages.length);

      this.unreadBarChartData.labels = this.conversations.map(c => c.name);
      this.unreadBarChartData.datasets[0].data = this.conversations.map(c => c.unreadMessages);
    }
  }
}
