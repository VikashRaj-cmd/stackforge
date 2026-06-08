/**
 * label-form.ts
 *
 * WHY:
 * Component to handle creation and updating of labels inside project workspaces.
 * Includes color recommendation defaults and color pickers.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LabelService } from '../../../core/services/label';
import { ProjectService } from '../../../core/services/project';

@Component({
  selector: 'app-label-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './label-form.html',
  styleUrl: './label-form.css',
})
export class LabelForm implements OnInit {
  loading = false;
  isEditMode = false;
  labelId = '';
  projectId = '';
  form: FormGroup;

  projects: any[] = [];

  defaultColors = [
    { name: 'Frontend', color: '#3B82F6' },
    { name: 'Backend', color: '#10B981' },
    { name: 'Bug', color: '#EF4444' },
    { name: 'Feature', color: '#8B5CF6' },
    { name: 'UI', color: '#F59E0B' },
    { name: 'Database', color: '#06B6D4' },
  ];

  constructor(
    private fb: FormBuilder,
    private labelService: LabelService,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      color: ['#3b82f6', [Validators.required, Validators.pattern(/^#[0-9A-Fa-f]{6}$/)]],
      description: [''],
      project: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadProjects();

    this.labelId = this.route.snapshot.paramMap.get('id') || '';
    this.projectId = this.route.snapshot.queryParamMap.get('projectId') || '';

    if (this.projectId) {
      this.form.patchValue({ project: this.projectId });
    }

    if (this.labelId) {
      this.isEditMode = true;
      this.form.get('project')?.disable();
      this.loadLabelDetails();
    }
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects = res.data || [];
      },
    });
  }

  loadLabelDetails(): void {
    if (!this.projectId || !this.labelId) return;
    this.loading = true;
    this.labelService.getLabels(this.projectId).subscribe({
      next: (res) => {
        const labelsList = res.data || [];
        const label = labelsList.find((l: any) => l._id === this.labelId);
        if (label) {
          this.form.patchValue({
            name: label.name,
            color: label.color,
            description: label.description || '',
            project: this.projectId,
          });
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/labels']);
      },
    });
  }

  selectColor(color: string): void {
    this.form.patchValue({ color });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formVal = this.form.getRawValue();
    const targetProjectId = formVal.project;

    const payload = {
      name: formVal.name,
      color: formVal.color,
      description: formVal.description,
    };

    if (this.isEditMode) {
      this.labelService.updateLabel(targetProjectId, this.labelId, payload).subscribe({
        next: () => {
          this.router.navigate(['/labels']);
        },
        error: (err) => {
          alert(err?.error?.message || 'Failed to update label.');
          this.loading = false;
        },
      });
    } else {
      this.labelService.createLabel(targetProjectId, payload).subscribe({
        next: () => {
          this.router.navigate(['/labels']);
        },
        error: (err) => {
          alert(err?.error?.message || 'Failed to create label.');
          this.loading = false;
        },
      });
    }
  }

  /**
   * Calculates dark vs light contrast text for hex labels dynamically.
   */
  getContrastColor(hexColor: string): string {
    if (!hexColor) return '#ffffff';
    const hex = hexColor.replace('#', '');
    if (hex.length !== 6) return '#ffffff';
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#1e293b' : '#ffffff';
  }
}
