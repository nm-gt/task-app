import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { FormControl } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, CommonModule, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  sidebarHidden = false;

  toggleSidebar() {
    this.sidebarHidden = !this.sidebarHidden;
  }

}

