/**
 * dashboard.ts
 *
 * WHY:
 * Dashboard connects frontend UI with backend APIs.
 * It loads projects and issues to show real summary cards.
 * Users endpoint is admin-only so it is not called here.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ProjectService } from '../../../core/services/project';
import { IssueService } from '../../../core/services/issue';
import { Issue } from '../../../core/models/issue.model';

interface StatCard {
  title: string;
  value: string;
  icon: string;
  helper: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {
  loading = true;
  errorMessage = '';

  totalProjects = 0;
  totalIssues = 0;
  openIssues = 0;
  resolvedIssues = 0;

  recentIssues: Issue[] = [];

  /**
   * Track pending API requests to control loading state.
   */
  private pending = 2;

  constructor(
    private projectService: ProjectService,
    private issueService: IssueService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadIssues();
  }

  /**
   * Load all projects for count.
   */
  private loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.totalProjects = res.data?.length || 0;
        this.tick();
      },
      error: () => {
        this.errorMessage = 'Unable to load projects.';
        this.tick();
      },
    });
  }

  /**
   * Load issues for counts and recent list.
   */
  private loadIssues(): void {
    this.issueService.getIssues('?page=1&limit=100&sort=-createdAt').subscribe({
      next: (res) => {
        const issues = res.data || [];
        this.totalIssues = res.meta?.total || issues.length;
        this.openIssues = issues.filter((i) => i.status === 'open').length;
        this.resolvedIssues = issues.filter((i) => i.status === 'resolved').length;
        this.recentIssues = issues.slice(0, 5);
        this.tick();
      },
      error: () => {
        this.errorMessage = 'Unable to load issues.';
        this.tick();
      },
    });
  }

  /**
   * Decrement pending counter; set loading false when all done.
   */
  private tick(): void {
    this.pending--;
    if (this.pending <= 0) this.loading = false;
  }

  /**
   * Dashboard statistic cards.
   */
  get stats(): StatCard[] {
    return [
      { title: 'Total Projects', value: String(this.totalProjects), icon: 'folder', helper: 'Active project workspaces' },
      { title: 'Total Issues', value: String(this.totalIssues), icon: 'bug_report', helper: 'All tracked issues' },
      { title: 'Open Issues', value: String(this.openIssues), icon: 'pending_actions', helper: 'Need attention' },
      { title: 'Resolved Issues', value: String(this.resolvedIssues), icon: 'task_alt', helper: 'Completed issues' },
    ];
  }

  /**
   * Track stat cards by title.
   */
  trackByStat(_: number, stat: StatCard): string {
    return stat.title;
  }

  /**
   * Track issue rows by ID.
   */
  trackByIssue(_: number, issue: Issue): string {
    return issue._id;
  }
}
