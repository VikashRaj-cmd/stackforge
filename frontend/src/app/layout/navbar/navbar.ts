/**
 * navbar.component.ts
 *
 * WHY:
 * Top navigation for authenticated pages.
 * Shows user information and logout action.
 */

import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../core/services/auth';
import { NotificationService } from '../../core/services/notification';
import { ThemeService } from '../../core/services/theme';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-navbar',
  imports: [MatIconModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  user: User | null;
  dropdownOpen = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    public notificationService: NotificationService,
    private themeService: ThemeService
  ) {
    this.user = this.auth.getCurrentUser();
  }

  /**
   * Switch between themes.
   */
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  get currentTheme(): string {
    return this.themeService.getCurrentTheme();
  }

  get initials(): string {
    if (!this.user?.name) return 'U';
    return this.user.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-menu')) {
      this.dropdownOpen = false;
    }
  }

  goToProfile(): void {
    this.dropdownOpen = false;
    this.router.navigate(['/profile']);
  }

  goToSettings(): void {
    this.dropdownOpen = false;
    this.router.navigate(['/settings']);
  }

  logout(): void {
    this.dropdownOpen = false;
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}