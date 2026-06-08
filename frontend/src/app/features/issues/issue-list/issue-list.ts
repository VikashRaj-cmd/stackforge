/**
 * issue-list.ts
 *
 * WHY:
 * Displays all issues with filtering, search, and delete actions.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IssueService } from '../../../core/services/issue';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './issue-list.html',
  styleUrl: './issue-list.css',
})
export class IssueList implements OnInit {
  loading = true;
  issues: any[] = [];

  // Search & Filters
  search = '';
  status = '';
  priority = '';
  type = '';

  constructor(
    private issueService: IssueService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadIssues();
  }

  loadIssues(): void {
    this.loading = true;
    
    const params: any = {};
    if (this.search.trim()) params.search = this.search.trim();
    if (this.status) params.status = this.status;
    if (this.priority) params.priority = this.priority;
    if (this.type) params.type = this.type;
    
    this.issueService.getIssues(params).subscribe({
      next: (res) => {
        this.issues = res.data || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  resetFilters(): void {
    this.search = '';
    this.status = '';
    this.priority = '';
    this.type = '';
    this.loadIssues();
  }

  deleteIssue(id: string, event: Event): void {
    event.stopPropagation();
    if (!confirm('Are you sure you want to delete this issue?')) return;
    
    this.issueService.deleteIssue(id).subscribe({
      next: () => {
        this.loadIssues();
      },
      error: (err) => {
        alert(err?.error?.message || 'Failed to delete issue. Only the reporter can delete.');
      }
    });
  }

  editIssue(id: string, event: Event): void {
    event.stopPropagation();
    this.router.navigate([`/issues/edit/${id}`]);
  }
}
