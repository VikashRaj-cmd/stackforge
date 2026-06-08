/**
 * project-form.ts
 *
 * WHY:
 * Used for both creating and updating projects.
 */

import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';

import { ProjectService } from '../../../core/services/project';

@Component({
  selector: 'app-project-form',
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './project-form.html',
  styleUrl: './project-form.css',
})
export class ProjectForm implements OnInit {
  loading = false;

  isEditMode = false;

  projectId = '';

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  /**
   * Detect edit mode.
   */
  ngOnInit(): void {
    this.projectId =
      this.route.snapshot.paramMap.get('id') || '';

    if (this.projectId) {
      this.isEditMode = true;
      this.loadProject();
    }
  }

  /**
   * Load existing project data.
   */
  loadProject(): void {
    this.projectService.getProject(this.projectId).subscribe({
      next: (res) => {
        this.form.patchValue({
          name: res.data.title,
          description: res.data.description,
        });
      },
    });
  }

  /**
   * Submit create/update form.
   */
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const payload = {
      title: this.form.value.name || '',
      description:
        this.form.value.description || '',
    };

    if (this.isEditMode) {
      this.projectService
        .updateProject(this.projectId, payload)
        .subscribe({
          next: () => {
            this.router.navigate(['/projects']);
          },
          error: (error) => {
            console.error(error);
            this.loading = false;
          },
        });

      return;
    }

    this.projectService.createProject(payload).subscribe({
      next: () => {
        this.router.navigate(['/projects']);
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      },
    });
  }
}