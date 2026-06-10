/**
 * activity-list.ts
 *
 * WHY:
 * Displays a global audit log timeline of all actions taken across the tracker.
 * Shows status updates, comment creations, issue assignments, and priority changes.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ActivityService } from '../../../core/services/activity';

@Component({
  selector: 'app-activity-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
  ],
  templateUrl: './activity-list.html',
  styleUrl: './activity-list.css',
})
export class ActivityList implements OnInit {
  loading = false;
  activities: any[] = [];
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
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Failed to retrieve activity log history.';
      },
    });
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
      case 'status_changed': return 'check_circle_outline';
      case 'assigned': return 'person_add';
      case 'unassigned': return 'person_remove';
      case 'commented': return 'chat_bubble_outline';
      default: return 'history';
    }
  }
}
