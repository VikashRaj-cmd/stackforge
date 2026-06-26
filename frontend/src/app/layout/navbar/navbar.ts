/**
 * navbar.component.ts
 *
 * WHY:
 * Top navigation for authenticated pages.
 * Shows user information and logout action.
 */

import { Component, HostListener, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../core/services/auth';
import { NotificationService } from '../../core/services/notification';
import { ThemeService } from '../../core/services/theme';
import { SearchService } from '../../core/services/search';
import { User } from '../../core/models/user.model';
import { Subject, Subscription, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  imports: [MatIconModule, RouterLink, CommonModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, OnDestroy {
  user: User | null;
  dropdownOpen = false;

  @Output() toggleSidebar = new EventEmitter<void>();

  searchQuery = '';
  searchResults: {
    projects: any[];
    issues: any[];
    users: any[];
    labels: any[];
  } = { projects: [], issues: [], users: [], labels: [] };
  showSuggestions = false;
  searchLoading = false;
  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    public notificationService: NotificationService,
    private themeService: ThemeService,
    private searchService: SearchService
  ) {
    this.user = this.auth.getCurrentUser();
  }

  ngOnInit(): void {
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => {
          if (!query.trim()) {
            this.searchLoading = false;
            return of({ projects: [], issues: [], users: [], labels: [] });
          }
          this.searchLoading = true;
          return this.searchService.searchAll(query);
        })
      )
      .subscribe({
        next: (results) => {
          this.searchResults = results;
          this.searchLoading = false;
          this.showSuggestions = true;
        },
        error: () => {
          this.searchLoading = false;
        },
      });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  onSearchInput(query: string): void {
    this.searchQuery = query;
    this.searchSubject.next(query);
  }

  selectSuggestion(type: string, id: string, extraParam?: string): void {
    this.showSuggestions = false;
    this.searchQuery = '';
    if (type === 'project') {
      this.router.navigate([`/projects/${id}`]);
    } else if (type === 'issue') {
      this.router.navigate([`/issues/${id}`]);
    } else if (type === 'user') {
      this.router.navigate([`/users/${id}`]);
    } else if (type === 'label') {
      this.router.navigate(['/labels'], { queryParams: { projectId: extraParam } });
    }
  }

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
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
    if (!target.closest('.search-box-container')) {
      this.showSuggestions = false;
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