/**
 * user-details.ts
 *
 * WHY:
 * Shows complete details for a single team member:
 * - Profile card with details and role badge.
 * - List of assigned projects.
 * - List of assigned issues.
 * - Recent activities timeline.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../../core/services/user';
import { ProjectService } from '../../../core/services/project';
import { IssueService } from '../../../core/services/issue';
import { ActivityService } from '../../../core/services/activity';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
  ],
  templateUrl: './user-details.html',
  styleUrl: './user-details.css',
})
export class UserDetails implements OnInit {
  loading = false;
  userId = '';
  user: any = null;
  assignedProjects: any[] = [];
  assignedIssues: any[] = [];
  recentActivities: any[] = [];
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private projectService: ProjectService,
    private issueService: IssueService,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    if (this.userId) {
      this.loadAllData();
    } else {
      this.errorMessage = 'No user ID provided.';
    }
  }

  loadAllData(): void {
    this.loading = true;
    this.errorMessage = '';

    // Fetch user details, all projects, and issues assigned to this user concurrently
    forkJoin({
      userRes: this.userService.getUser(this.userId),
      projectsRes: this.projectService.getProjects(),
      issuesRes: this.issueService.getIssues(`?assignee=${this.userId}`),
      activitiesRes: this.activityService.getActivityLogs({ actor: this.userId })
    }).subscribe({
      next: (res) => {
        this.user = res.userRes.data;
        
        // Filter projects where the user is a member
        const allProjects = res.projectsRes.data || [];
        this.assignedProjects = allProjects.filter((proj: any) => {
          return proj.members && proj.members.some((m: any) => {
            const memberId = (typeof m.user === 'object' && m.user !== null) ? m.user._id : m.user;
            return memberId === this.userId;
          });
        });

        this.assignedIssues = res.issuesRes.data || [];
        this.recentActivities = res.activitiesRes.data || [];
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Failed to load user details.';
      }
    });
  }

  getRoleBadgeClass(role: string): string {
    if (!role) return 'badge-gray';
    const r = role.toLowerCase();
    if (r === 'admin') return 'badge-purple';
    if (r === 'manager') return 'badge-blue';
    if (r === 'developer') return 'badge-green';
    return 'badge-gray';
  }

  /**
   * Translates activity logs actions into user friendly sentences.
   */
  formatActivityAction(activity: any): string {
    const actor = activity.actor?.name || 'Someone';
    const issueTitle = activity.issue?.title ? `"${activity.issue.title}"` : 'an issue';
    
    switch (activity.action) {
      case 'status_changed':
        return `changed status of ${issueTitle} to ${activity.afterValue}`;
      case 'priority_changed':
        return `changed priority of ${issueTitle} to ${activity.afterValue}`;
      case 'assigned':
        return `assigned ${issueTitle}`;
      case 'unassigned':
        return `unassigned ${issueTitle}`;
      case 'commented':
        return `commented on ${issueTitle}`;
      default:
        return `performed ${activity.action} on ${issueTitle}`;
    }
  }

  formatActivityIcon(action: string): string {
    switch (action) {
      case 'status_changed': return 'check_circle_outline';
      case 'assigned': return 'person_add';
      case 'unassigned': return 'person_remove';
      case 'commented': return 'chat_bubble_outline';
      default: return 'history';
    }
  }
}
