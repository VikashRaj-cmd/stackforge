/**
 * issue-details.ts
 *
 * WHY:
 * Displays single issue details, supports workflow status updates, assignment,
 * and renders activity timeline.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { IssueService } from '../../../core/services/issue';
import { ProjectService } from '../../../core/services/project';

@Component({
  selector: 'app-issue-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './issue-details.html',
  styleUrl: './issue-details.css',
})
export class IssueDetails implements OnInit {
  loading = true;
  issueId = '';
  issue: any = null;
  activities: any[] = [];
  projectMembers: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private issueService: IssueService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.issueId = this.route.snapshot.paramMap.get('id') || '';
    if (this.issueId) {
      this.loadIssueDetails();
      this.loadActivity();
    } else {
      this.router.navigate(['/issues']);
    }
  }

  loadIssueDetails(): void {
    this.loading = true;
    this.issueService.getIssue(this.issueId).subscribe({
      next: (res) => {
        this.issue = res.data;
        const projectId = this.issue.project?._id || this.issue.project;
        if (projectId) {
          this.loadProjectMembers(projectId);
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/issues']);
      },
    });
  }

  loadActivity(): void {
    this.issueService.getActivity(this.issueId).subscribe({
      next: (res) => {
        this.activities = res.data || [];
      },
      error: (err) => {
        console.error('Failed to load activity:', err);
      }
    });
  }

  loadProjectMembers(projectId: string): void {
    this.projectService.getProject(projectId).subscribe({
      next: (res) => {
        const membersList = res.data?.members || [];
        this.projectMembers = membersList.map((m: any) => m.user).filter((u: any) => !!u);
      },
    });
  }

  updateStatus(status: string): void {
    this.issueService.updateStatus(this.issueId, status).subscribe({
      next: () => {
        this.loadIssueDetails();
        this.loadActivity();
      },
      error: (err) => {
        alert(err?.error?.message || 'Failed to update status. Only the reporter or assignee can update.');
      }
    });
  }

  onAssigneeChange(assigneeId: string): void {
    this.issueService.assignIssue(this.issueId, assigneeId).subscribe({
      next: () => {
        this.loadIssueDetails();
        this.loadActivity();
      },
      error: (err) => {
        alert(err?.error?.message || 'Failed to assign issue.');
      }
    });
  }

  deleteIssue(): void {
    if (!confirm('Are you sure you want to delete this issue?')) return;
    this.issueService.deleteIssue(this.issueId).subscribe({
      next: () => {
        this.router.navigate(['/issues']);
      },
      error: (err) => {
        alert(err?.error?.message || 'Failed to delete issue. Only the reporter can delete.');
      }
    });
  }

  getContrastColor(hexColor: string): string {
    if (!hexColor) return '#ffffff';
    const hex = hexColor.replace('#', '');
    if (hex.length !== 6) return '#ffffff';
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#1e293b' : '#ffffff';
  }
}
