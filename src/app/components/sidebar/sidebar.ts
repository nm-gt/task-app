import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule, NgIf],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css']
})
export class Sidebar {

  @Input() sidebarHidden: boolean = false;

  @Output() toggleSidebarEvent = new EventEmitter<void>();

  today: string;


  constructor(public auth: AuthService) {
    const now = new Date();
    this.today = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
  }

  toggleSidebar(e: Event) {
    e.preventDefault();
    this.sidebarHidden = !this.sidebarHidden;
    this.toggleSidebarEvent.emit();
  }

}
