/**
 * project-details.ts
 *
 * WHY:
 * Shows single project information and member management.
 */

import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ActivatedRoute } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';

import { ProjectService } from '../../../core/services/project';

@Component({
  selector: 'app-project-details',
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './project-details.html',
  styleUrl: './project-details.css',
})
export class ProjectDetails implements OnInit {
  project: any = null;

  userId = '';

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  /**
   * Load project details.
   */
  ngOnInit(): void {
    const projectId =
      this.route.snapshot.paramMap.get('id') || '';

    this.loadProject(projectId);
  }

  /**
   * Fetch project details from backend.
   */
  loadProject(id: string): void {
    this.projectService.getProject(id).subscribe({
      next: (res) => {
        this.project = res.data;
      },
    });
  }

  /**
   * Add member to project.
   * Only project owner can add members — show alert on 403.
   */
  addMember(): void {
    if (!this.userId.trim()) {
      return;
    }

    this.projectService
      .addMember(this.project._id, this.userId)
      .subscribe({
        next: () => {
          this.loadProject(this.project._id);
          this.userId = '';
        },
        error: (err) => {
          alert(err?.error?.message || 'Only the project owner can add members.');
        },
      });
  }

  /**
   * Remove member from project.
   * Only project owner can remove members — show alert on 403.
   */
  removeMember(userId: string): void {
    this.projectService
      .removeMember(this.project._id, userId)
      .subscribe({
        next: () => {
          this.loadProject(this.project._id);
        },
        error: (err) => {
          alert(err?.error?.message || 'Only the project owner can remove members.');
        },
      });
  }
}