/**
 * project-list.ts
 *
 * WHY:
 * Shows all projects from backend API.
 * Uses shared components (PageHeader, LoadingSpinner, EmptyState, TableToolbar)
 * and Material dialog for confirmations.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

import { ProjectService } from '../../../core/services/project';
import { PageHeader } from '../../../shared/components/page-header/page-header';
import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { TableToolbar } from '../../../shared/components/table-toolbar/table-toolbar';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatDialogModule,
    PageHeader,
    LoadingSpinner,
    EmptyState,
    TableToolbar,
  ],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList implements OnInit {
  loading = true;
  projects: any[] = [];
  filteredProjects: any[] = [];
  search = '';

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  /**
   * Fetch projects from backend.
   */
  loadProjects(): void {
    this.loading = true;
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects = res.data || [];
        this.filterProjects();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  /**
   * Filter projects by search term.
   */
  filterProjects(): void {
    const q = this.search.trim().toLowerCase();
    if (!q) {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }
  }

  /**
   * Delete project by ID using custom dialog.
   */
  deleteProject(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {
        title: 'Delete Project?',
        message: 'Are you sure you want to delete this project? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        isDelete: true,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.projects = this.projects.filter((p) => p._id !== id);
        this.filterProjects();

        this.projectService.deleteProject(id).subscribe({
          error: () => {
            this.loadProjects();
          },
        });
      }
    });
  }

  /**
   * Navigate to edit page.
   */
  editProject(id: string): void {
    this.router.navigate([`/projects/edit/${id}`]);
  }
}