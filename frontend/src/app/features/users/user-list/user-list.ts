/**
 * user-list.ts
 *
 * WHY:
 * Lists all registered users/team members in a directory table.
 * Utilises shared UI components (PageHeader, LoadingSpinner, EmptyState, ErrorState, TableToolbar).
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { UserService } from '../../../core/services/user';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { ErrorState } from '../../../shared/components/error-state/error-state';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    PageHeader,
    LoadingSpinner,
    EmptyState,
    ErrorState,
    TableToolbar,
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  loading = false;
  users: any[] = [];
  filteredUsers: any[] = [];
  search = '';
  errorMessage = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.errorMessage = '';
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res.data || [];
        this.filterUsers();
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'You do not have permission to view the user list.';
      },
    });
  }

  /**
   * Filter users based on client-side search query.
   */
  filterUsers(): void {
    const q = this.search.trim().toLowerCase();
    if (!q) {
      this.filteredUsers = [...this.users];
    } else {
      this.filteredUsers = this.users.filter(
        (u) =>
          (u.name && u.name.toLowerCase().includes(q)) ||
          (u.email && u.email.toLowerCase().includes(q)) ||
          (u.role && u.role.toLowerCase().includes(q))
      );
    }
  }

  /**
   * Helper to determine appropriate role badge color.
   */
  getRoleBadgeClass(role: string): string {
    if (!role) return 'badge-gray';
    const r = role.toLowerCase();
    if (r === 'admin') return 'badge-purple';
    if (r === 'manager') return 'badge-blue';
    if (r === 'developer') return 'badge-green';
    return 'badge-gray';
  }
}
