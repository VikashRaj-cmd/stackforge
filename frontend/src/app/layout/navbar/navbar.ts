/**
 * navbar.component.ts
 *
 * WHY:
 * Top navigation for authenticated pages.
 * Shows user information and logout action.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../core/services/auth';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-navbar',
  imports: [MatIconModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  user: User | null;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.user = this.auth.getCurrentUser();
  }

  /**
   * Logout current user and redirect to login page.
   */
  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}