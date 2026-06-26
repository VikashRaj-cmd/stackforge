/**
 * activity-list.ts
 *
 * WHY:
 * Displays a global audit log timeline of all actions taken across the tracker.
 * Utilises shared components (PageHeader, LoadingSpinner, EmptyState, ErrorState, TableToolbar).
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { ActivityService } from '../../../core/services/activity';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { ErrorState } from '../../../shared/components/error-state/error-state';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';

@Component({
  selector: 'app-activity-list',
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
  templateUrl: './activity-list.html',
  styleUrl: './activity-list.css',
})
export class ActivityList implements OnInit {
  loading = false;
  activities: any[] = [];
  filteredActivities: any[] = [];
  search = '';
  errorMessage = '';

  constructor(private activityService: ActivityService) {}

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities(): void {
    this.loading = true;
    this.errorMessage = '';
    this.activityService.getActivityLogs().subscribe({
      next: (res) => {
        this.activities = res.data || [];
        this.filterActivities();
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Failed to retrieve activity log history.';
      },
    });
  }

  /**
   * Client-side filter for activity logs
   */
  filterActivities(): void {
    const q = this.search.trim().toLowerCase();
    if (!q) {
      this.filteredActivities = [...this.activities];
    } else {
      this.filteredActivities = this.activities.filter((act) => {
        const text = this.getActivityText(act).toLowerCase();
        const actor = (act.actor?.name || '').toLowerCase();
        const action = (act.action || '').toLowerCase();
        return text.includes(q) || actor.includes(q) || action.includes(q);
      });
    }
  }

  /**
   * Generates a descriptive log message depending on the action performed.
   */
  getActivityText(activity: any): string {
    const actorName = activity.actor?.name || 'Someone';
    const issueTitle = activity.issue?.title ? `"${activity.issue.title}"` : 'an issue';

    switch (activity.action) {
      case 'status_changed':
        return `updated the status of issue ${issueTitle} from "${activity.beforeValue}" to "${activity.afterValue}"`;
      case 'priority_changed':
        return `changed priority of issue ${issueTitle} from "${activity.beforeValue}" to "${activity.afterValue}"`;
      case 'assigned':
        return `assigned issue ${issueTitle} to another member`;
      case 'unassigned':
        return `unassigned issue ${issueTitle}`;
      case 'commented':
        return `added a new comment on issue ${issueTitle}`;
      default:
        return `performed action "${activity.action}" on ${issueTitle}`;
    }
  }

  getActivityIcon(action: string): string {
    switch (action) {
      case 'status_changed':
        return 'check_circle_outline';
      case 'assigned':
        return 'person_add';
      case 'unassigned':
        return 'person_remove';
      case 'commented':
        return 'chat_bubble_outline';
      default:
        return 'history';
    }
  }
}
