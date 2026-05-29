/**
 * dashboard.ts
 *
 * WHY:
 * Dashboard connects frontend UI with backend APIs.
 * It loads projects, issues, users and shows real summary cards.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // <-- CHANGED: Use RouterModule, not RouterLink

import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ProjectService } from '../../../core/services/project';
import { IssueService } from '../../../core/services/issue';
import { UserService } from '../../../core/services/user';
import { Issue } from '../../../core/models/issue.model';

interface StatCard {
  title: string;
  value: string;
  icon: string;
  helper: string;
  trend?: string; // <-- CHANGED: Added optional trend property
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, MatIconModule, MatProgressSpinnerModule], // <-- CHANGED: Replaced RouterLink with RouterModule
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'], // <-- FIXED: was styleUrl -> should be styleUrls
})
export class Dashboard implements OnInit {
  loading = true;
  errorMessage = '';

  totalProjects = 0;
  totalIssues = 0;
  openIssues = 0;
  resolvedIssues = 0;
  teamMembers = 0;

  recentIssues: Issue[] = [];

  constructor(
    private projectService: ProjectService,
    private issueService: IssueService,
    private userService: UserService
  ) {}

  /**
   * Load dashboard data when page opens.
   */
  ngOnInit(): void {
    this.loadDashboard();
  }

  /**
   * Load all dashboard APIs.
   */
  loadDashboard(): void {
    this.loading = true;
    this.errorMessage = '';

    this.loadProjects();
    this.loadIssues();
    this.loadUsers();
  }

  /**
   * Load project count from backend.
   */
  private loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.totalProjects = res.data?.length || 0;
        this.stopLoading();
      },
      error: () => {
        this.errorMessage = 'Unable to load projects.';
        this.stopLoading();
      },
    });
  }

  /**
   * Load issues and calculate issue statistics.
   */
  private loadIssues(): void {
    this.issueService.getIssues('?page=1&limit=100&sort=-createdAt').subscribe({
      next: (res) => {
        const issues = res.data || [];

        this.totalIssues = res.meta?.total || issues.length;
        this.openIssues = issues.filter((issue) => issue.status === 'open').length;
        this.resolvedIssues = issues.filter((issue) => issue.status === 'resolved').length;
        this.recentIssues = issues.slice(0, 5);

        this.stopLoading();
      },
      error: () => {
        this.errorMessage = 'Unable to load issues.';
        this.stopLoading();
      },
    });
  }

  /**
   * Load user count.
   * If logged-in user is not admin, backend may return 403.
   * In that case, we show 0 instead of breaking dashboard.
   */
  private loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.teamMembers = res.data?.length || 0;
        this.stopLoading();
      },
      error: () => {
        this.teamMembers = 0;
        this.stopLoading();
      },
    });
  }

  /**
   * Stop loading after API response.
   */
  private stopLoading(): void {
    this.loading = false;
  }

  /**
   * Build dashboard stat cards dynamically.
   */
  get stats(): StatCard[] {
    return [
      {
        title: 'Total Projects',
        value: String(this.totalProjects),
        icon: 'folder',
        helper: 'Active project workspaces',
        trend: '+3 this week', // <-- CHANGED: Added trend sample
      },
      {
        title: 'Total Issues',
        value: String(this.totalIssues),
        icon: 'bug_report',
        helper: 'All tracked issues',
        trend: '-1 since yesterday',
      },
      {
        title: 'Open Issues',
        value: String(this.openIssues),
        icon: 'pending_actions',
        helper: 'Need attention',
        trend: '+2 new',
      },
      {
        title: 'Resolved Issues',
        value: String(this.resolvedIssues),
        icon: 'task_alt',
        helper: 'Completed issues',
        trend: '+5 completed',
      },
      {
        title: 'Team Members',
        value: String(this.teamMembers),
        icon: 'groups',
        helper: 'Visible for admin users',
        trend: '', // optional, no trend
      },
    ];
  }

  /**
   * Return CSS class based on issue priority.
   */
  getPriorityClass(priority: string): string {
    return `priority ${priority}`;
  }

  // <-- CHANGED: Added trackBy function for *ngFor
  trackByTitle(index: number, item: { title: string }) {
    return item.title;
  }
}