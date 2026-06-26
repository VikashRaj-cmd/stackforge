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
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { IssueService } from '../../../core/services/issue';

import { PageHeader } from '../../../shared/components/page-header/page-header';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    PageHeader,
    LoadingSpinner,
    EmptyState,
    TableToolbar,
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
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadIssues();
  }

  loadIssues(): void {
    this.loading = true;
    
    const queryParts: string[] = [];
    if (this.search.trim()) queryParts.push(`search=${encodeURIComponent(this.search.trim())}`);
    if (this.status) queryParts.push(`status=${this.status}`);
    if (this.priority) queryParts.push(`priority=${this.priority}`);
    if (this.type) queryParts.push(`type=${this.type}`);
    
    const query = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
    
    this.issueService.getIssues(query).subscribe({
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
    
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Delete Issue?',
        message: 'Are you sure you want to delete this issue? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        isDelete: true
      }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.issueService.deleteIssue(id).subscribe({
          next: () => {
            this.loadIssues();
          },
          error: (err) => {
            alert(err?.error?.message || 'Failed to delete issue. Only the reporter can delete.');
          }
        });
      }
    });
  }

  editIssue(id: string, event: Event): void {
    event.stopPropagation();
    this.router.navigate([`/issues/edit/${id}`]);
  }
}
