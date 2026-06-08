/**
 * issue-board.ts
 *
 * WHY:
 * Kanban board displaying issues grouped by status.
 * Handles drag and drop updates to status.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { IssueService } from '../../../core/services/issue';

@Component({
  selector: 'app-issue-board',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
  ],
  templateUrl: './issue-board.html',
  styleUrl: './issue-board.css',
})
export class IssueBoard implements OnInit {
  loading = true;
  issues: any[] = [];
  
  columns = [
    { name: 'Open', status: 'open', icon: 'play_circle' },
    { name: 'In Progress', status: 'in-progress', icon: 'pending_actions' },
    { name: 'In Review', status: 'in-review', icon: 'rate_review' },
    { name: 'Resolved', status: 'resolved', icon: 'task_alt' },
    { name: 'Closed', status: 'closed', icon: 'lock' },
  ];

  draggedIssue: any = null;

  constructor(private issueService: IssueService, private router: Router) {}

  ngOnInit(): void {
    this.loadIssues();
  }

  loadIssues(): void {
    this.loading = true;
    this.issueService.getIssues({ limit: 100 }).subscribe({
      next: (res) => {
        this.issues = res.data || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  getIssuesByStatus(status: string): any[] {
    return this.issues.filter((i) => i.status === status);
  }

  onDragStart(issue: any, event: DragEvent): void {
    this.draggedIssue = issue;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', issue._id);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(status: string, event: DragEvent): void {
    event.preventDefault();
    if (!this.draggedIssue) return;
    
    const issueId = this.draggedIssue._id;
    const oldStatus = this.draggedIssue.status;
    
    if (oldStatus === status) return;

    this.draggedIssue.status = status;
    this.draggedIssue = null;

    this.issueService.updateStatus(issueId, status).subscribe({
      error: (err) => {
        alert(err?.error?.message || 'Failed to update status. Only reporter or assignee can change status.');
        this.loadIssues();
      },
    });
  }

  viewIssue(id: string): void {
    this.router.navigate([`/issues/${id}`]);
  }
}
