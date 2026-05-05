/**
 * dashboard.component.ts
 *
 * WHY:
 * Home dashboard showing project health, issue status,
 * and quick overview cards.
 */

import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

interface StatCard {
  title: string;
  value: string;
  icon: string;
  trend: string;
}

interface RecentIssue {
  title: string;
  project: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  stats: StatCard[] = [
    { title: 'Total Projects', value: '12', icon: 'folder', trend: '+3 this month' },
    { title: 'Open Issues', value: '48', icon: 'bug_report', trend: '+8 this week' },
    { title: 'Resolved', value: '126', icon: 'check_circle', trend: '+21 this month' },
    { title: 'Team Members', value: '18', icon: 'group', trend: '+2 recently' },
  ];

  recentIssues: RecentIssue[] = [
    {
      title: 'Login page validation error',
      project: 'Issue Tracker',
      priority: 'high',
      status: 'In Progress',
    },
    {
      title: 'Dashboard cards not responsive',
      project: 'Admin Panel',
      priority: 'medium',
      status: 'Open',
    },
    {
      title: 'JWT token expiry handling',
      project: 'Backend API',
      priority: 'critical',
      status: 'In Review',
    },
  ];
}