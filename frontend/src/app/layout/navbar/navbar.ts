/**
 * navbar.component.ts
 *
 * WHY:
 * Top bar for search, user status, and quick identity section.
 */

import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  today = new Date();
}