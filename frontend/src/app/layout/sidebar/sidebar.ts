/**
 * sidebar.component.ts
 *
 * WHY:
 * Sidebar gives quick navigation to all main modules.
 * Uses Angular Material icons instead of emojis.
 */

import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/' },
    { label: 'Projects', icon: 'folder', route: '/projects' },
    { label: 'Issues', icon: 'bug_report', route: '/issues' },
    { label: 'Users', icon: 'group', route: '/users' },
    { label: 'Labels', icon: 'sell', route: '/labels' },
  ];
}