/**
 * dashboard.ts
 *
 * WHY:
 * Central analytics dashboard.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { DashboardService } from '../../../core/services/dashboard';
import { AuthService } from '../../../core/services/auth';
import { User } from '../../../core/models/user.model';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';
import { ErrorState } from '../../../shared/components/error-state/error-state';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterLink,
    LoadingSpinner,
    ErrorState,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  loading = true;
  errorMessage = '';
  currentUser: User | null = null;

  totalProjects = 0;
  totalIssues = 0;
  openIssues = 0;
  resolvedIssues = 0;

  recentProjects: any[] = [];
  recentActivities: any[] = [];

  statusStats: { status: string; count: number; percentage: number; color: string }[] = [];
  priorityStats: { priority: string; count: number; percentage: number; color: string }[] = [];

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadDashboard();
  }

  /**
   * Load dashboard analytics.
   */
  loadDashboard(): void {
    this.loading = true;
    this.errorMessage = '';

    this.dashboardService
      .getDashboardData()
      .subscribe({
        next: (data) => {
          const projects = data.projects.data || [];
          const issues = data.issues.data || [];
          const activities = data.activities.data || [];

          this.totalProjects = projects.length;
          this.totalIssues = issues.length;

          this.openIssues = issues.filter(
            (issue: any) => issue.status === 'open'
          ).length;

          this.resolvedIssues = issues.filter(
            (issue: any) => issue.status === 'resolved'
          ).length;

          this.recentProjects = projects.slice(0, 5);
          this.recentActivities = activities.slice(0, 5);

          // Status distribution aggregation
          const statusMap = {
            'open': { count: 0, color: '#3b82f6' }, // blue
            'in-progress': { count: 0, color: '#f59e0b' }, // amber
            'in-review': { count: 0, color: '#a855f7' }, // purple
            'resolved': { count: 0, color: '#10b981' }, // green
            'closed': { count: 0, color: '#64748b' } // slate
          };

          // Priority distribution aggregation
          const priorityMap = {
            'critical': { count: 0, color: '#ef4444' }, // red
            'high': { count: 0, color: '#f97316' }, // orange
            'medium': { count: 0, color: '#3b82f6' }, // blue
            'low': { count: 0, color: '#10b981' } // green
          };

          issues.forEach((issue: any) => {
            const statusKey = (issue.status || '').toLowerCase();
            if (statusKey in statusMap) {
              statusMap[statusKey as keyof typeof statusMap].count++;
            }
            const priorityKey = (issue.priority || '').toLowerCase();
            if (priorityKey in priorityMap) {
              priorityMap[priorityKey as keyof typeof priorityMap].count++;
            }
          });

          // Convert to arrays with percentages
          this.statusStats = Object.entries(statusMap).map(([status, item]) => ({
            status: this.formatLabel(status),
            count: item.count,
            percentage: this.totalIssues > 0 ? (item.count / this.totalIssues) * 100 : 0,
            color: item.color
          }));

          this.priorityStats = Object.entries(priorityMap).map(([priority, item]) => ({
            priority: this.formatLabel(priority),
            count: item.count,
            percentage: this.totalIssues > 0 ? (item.count / this.totalIssues) * 100 : 0,
            color: item.color
          }));

          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || 'Failed to load dashboard metrics.';
          this.loading = false;
        }
      });
  }

  /**
   * Helper to format labels from kebab-case/lowercase to capitalized words.
   */
  private formatLabel(val: string): string {
    return val
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Generates a descriptive log message depending on the action performed.
   */
  getActivityText(activity: any): string {
    const actorName = activity.actor?.name || 'Someone';
    const issueTitle = activity.issue?.title ? `"${activity.issue.title}"` : 'an issue';
    
    switch (activity.action) {
      case 'status_changed':
        return `${actorName} updated status of ${issueTitle} to "${activity.afterValue}"`;
      case 'priority_changed':
        return `${actorName} changed priority of ${issueTitle} to "${activity.afterValue}"`;
      case 'assigned':
        return `${actorName} assigned ${issueTitle}`;
      case 'unassigned':
        return `${actorName} unassigned ${issueTitle}`;
      case 'commented':
        return `${actorName} commented on ${issueTitle}`;
      default:
        return `${actorName} performed action "${activity.action}" on ${issueTitle}`;
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
