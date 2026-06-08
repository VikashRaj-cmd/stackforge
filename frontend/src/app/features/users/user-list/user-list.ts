/**
 * user-list.ts
 *
 * WHY:
 * Admin-only view to list all users.
 * Regular users see a permission message.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


import { UserService } from '../../../core/services/user';
import { AuthService } from '../../../core/services/auth';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, MatIconModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  loading = true;
  users: User[] = [];
  isAdmin = false;

  constructor(
    private userService: UserService,
    private auth: AuthService
  ) {}

  /**
   * Only load users if current user is admin.
   */
  ngOnInit(): void {
    const currentUser = this.auth.getCurrentUser();
    this.isAdmin = currentUser?.role === 'admin';

    if (this.isAdmin) {
      this.loadUsers();
    } else {
      this.loading = false;
    }
  }

  /**
   * Fetch all users from backend (admin only).
   */
  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = res.data || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
