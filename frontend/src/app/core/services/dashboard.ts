/**
 * dashboard.ts
 *
 * WHY:
 * Dashboard aggregates data from
 * Projects, Issues, Users and Activity.
 */

import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { ProjectService } from './project';
import { IssueService } from './issue';
import { UserService } from './user';
import { ActivityService } from './activity';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private projectService: ProjectService,
    private issueService: IssueService,
    private userService: UserService,
    private activityService: ActivityService
  ) {}

  /**
   * Load dashboard data simultaneously.
   */
  getDashboardData(): Observable<any> {
    return forkJoin({
      projects: this.projectService.getProjects(),
      issues: this.issueService.getIssues(),
      users: this.userService.getUsers(),
      activities: this.activityService.getActivityLogs()
    });
  }
}
