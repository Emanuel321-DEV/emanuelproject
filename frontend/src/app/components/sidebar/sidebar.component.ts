import { Component } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { LucideAngularModule, MessageCircle, CircleUserRound, LayoutDashboard, Settings } from 'lucide-angular';


@Component({
  selector: 'app-sidebar',
  imports: [LucideAngularModule, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  readonly MessageCircle  = MessageCircle ;
  readonly CircleUserRound   = CircleUserRound  ;
  readonly LayoutDashboard   = LayoutDashboard  ;
  readonly Settings   = Settings  ;
}
