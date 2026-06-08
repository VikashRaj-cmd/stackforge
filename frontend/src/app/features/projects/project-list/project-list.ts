/**
 * project-list.ts
 *
 * WHY:
 * Shows all projects from backend API.
 * Allows navigation to create, edit, details and delete actions.
 */

import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';

import { ProjectService } from '../../../core/services/project';

@Component({
  selector: 'app-project-list',
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList implements OnInit {
  loading = true;

  projects: any[] = [];

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {}

  /**
   * Load all projects.
   */
  ngOnInit(): void {
    this.loadProjects();
  }

  /**
   * Fetch projects from backend.
   */
  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects = res.data || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  /**
   * Delete project by ID.
   */
  deleteProject(id: string): void {
    if (!confirm('Are you sure you want to delete this project?')) return;

    this.projects = this.projects.filter((p) => p._id !== id);

    this.projectService.deleteProject(id).subscribe({
      error: () => {
        this.loadProjects();
      },
    });
  }

  /**
   * Navigate to edit page.
   */
  editProject(id: string): void {
    this.router.navigate([`/projects/edit/${id}`]);
  }
}