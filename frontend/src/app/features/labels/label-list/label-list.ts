/**
 * label-list.ts
 *
 * WHY:
 * Displays all labels for a selected project workspace.
 * Allows quick creation, editing, and deletion of project-scoped labels.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LabelService } from '../../../core/services/label';
import { ProjectService } from '../../../core/services/project';

@Component({
  selector: 'app-label-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './label-list.html',
  styleUrl: './label-list.css',
})
export class LabelList implements OnInit {
  loading = false;
  projects: any[] = [];
  selectedProjectId = '';
  labels: any[] = [];

  constructor(
    private labelService: LabelService,
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects = res.data || [];
        if (this.projects.length > 0) {
          this.selectedProjectId = this.projects[0]._id;
          this.loadLabels();
        }
      },
    });
  }

  loadLabels(): void {
    if (!this.selectedProjectId) {
      this.labels = [];
      return;
    }
    this.loading = true;
    this.labelService.getLabels(this.selectedProjectId).subscribe({
      next: (res) => {
        this.labels = res.data || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.labels = [];
      },
    });
  }

  deleteLabel(id: string): void {
    if (!confirm('Are you sure you want to delete this label?')) return;
    
    this.labelService.deleteLabel(this.selectedProjectId, id).subscribe({
      next: () => {
        this.loadLabels();
      },
      error: (err) => {
        alert(err?.error?.message || 'Failed to delete label.');
      },
    });
  }

  editLabel(id: string): void {
    this.router.navigate([`/labels/edit/${id}`], {
      queryParams: { projectId: this.selectedProjectId },
    });
  }

  /**
   * Calculates dark vs light contrast text for hex labels dynamically.
   */
  getContrastColor(hexColor: string): string {
    if (!hexColor) return '#ffffff';
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#1e293b' : '#ffffff';
  }
}
