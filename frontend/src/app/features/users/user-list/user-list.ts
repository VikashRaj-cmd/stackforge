/**
 * user-list.ts
 *
 * WHY:
 * Lists all registered users/team members in a directory table.
 * Displays user profile metadata, role status, and navigation to detailed profile views.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../../core/services/user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  loading = false;
  users: any[] = [];
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
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'You do not have permission to view the user list.';
      },
    });
  }

  /**
   * Helper to determine appropriate role badge color
   */
  getRoleBadgeClass(role: string): string {
    if (!role) return 'badge-gray';
    const r = role.toLowerCase();
    if (r === 'admin') return 'badge-purple';
    if (r === 'manager') return 'badge-blue';
    if (r === 'developer') return 'badge-green';
    return 'badge-gray'; // maps member/user to gray
  }
}
