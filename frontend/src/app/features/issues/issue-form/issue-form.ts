/**
 * issue-form.ts
 *
 * WHY:
 * Handles issue creation and updating, dynamic project member retrieval.
 * Supports project-scoped label assignment.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { IssueService } from '../../../core/services/issue';
import { ProjectService } from '../../../core/services/project';
import { LabelService } from '../../../core/services/label';

@Component({
  selector: 'app-issue-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './issue-form.html',
  styleUrl: './issue-form.css',
})
export class IssueForm implements OnInit {
  loading = false;
  isEditMode = false;
  issueId = '';
  form: FormGroup;
  
  projects: any[] = [];
  assignees: any[] = [];
  projectLabels: any[] = [];

  constructor(
    private fb: FormBuilder,
    private issueService: IssueService,
    private projectService: ProjectService,
    private labelService: LabelService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      description: [''],
      type: ['bug', [Validators.required]],
      priority: ['medium', [Validators.required]],
      project: ['', [Validators.required]],
      assignee: [''],
      dueDate: [''],
      labels: [[]],
    });
  }

  ngOnInit(): void {
    this.loadProjects();

    this.issueId = this.route.snapshot.paramMap.get('id') || '';
    if (this.issueId) {
      this.isEditMode = true;
      this.loadIssue();
    }

    // Watch for project workspace change to populate corresponding members as assignees & load labels
    this.form.get('project')?.valueChanges.subscribe((projectId) => {
      if (projectId) {
        this.loadProjectMembers(projectId);
        this.loadProjectLabels(projectId);
      } else {
        this.assignees = [];
        this.projectLabels = [];
      }
    });
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (res) => {
        this.projects = res.data || [];
      },
    });
  }

  loadProjectMembers(projectId: string, callback?: () => void): void {
    this.projectService.getProject(projectId).subscribe({
      next: (res) => {
        const membersList = res.data?.members || [];
        this.assignees = membersList.map((m: any) => m.user).filter((u: any) => !!u);
        if (callback) callback();
      },
      error: () => {
        this.assignees = [];
        if (callback) callback();
      }
    });
  }

  loadProjectLabels(projectId: string, callback?: () => void): void {
    this.labelService.getLabels(projectId).subscribe({
      next: (res) => {
        this.projectLabels = res.data || [];
        if (callback) callback();
      },
      error: () => {
        this.projectLabels = [];
        if (callback) callback();
      }
    });
  }

  loadIssue(): void {
    this.loading = true;
    this.issueService.getIssue(this.issueId).subscribe({
      next: (res) => {
        const issue = res.data;
        const projectId = issue.project ? (typeof issue.project === 'string' ? issue.project : issue.project._id) : '';
        
        this.loadProjectMembers(projectId, () => {
          this.loadProjectLabels(projectId, () => {
            const labelIds = (issue.labels || []).map((l: any) => typeof l === 'string' ? l : l._id);
            this.form.patchValue({
              title: issue.title,
              description: issue.description || '',
              type: issue.type,
              priority: issue.priority,
              project: projectId,
              assignee: !issue.assignee ? '' : (typeof issue.assignee === 'string' ? issue.assignee : issue.assignee._id),
              dueDate: issue.dueDate ? new Date(issue.dueDate).toISOString().substring(0, 10) : '',
              labels: labelIds,
            });
            this.loading = false;
          });
        });
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/issues']);
      },
    });
  }

  isLabelSelected(labelId: string): boolean {
    const selectedLabels = this.form.get('labels')?.value || [];
    return selectedLabels.includes(labelId);
  }

  toggleLabelSelection(labelId: string): void {
    const selectedLabels = [...(this.form.get('labels')?.value || [])];
    const index = selectedLabels.indexOf(labelId);
    if (index > -1) {
      selectedLabels.splice(index, 1);
    } else {
      selectedLabels.push(labelId);
    }
    this.form.patchValue({ labels: selectedLabels });
  }

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

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formVal = this.form.value;
    
    const payload: any = {
      title: formVal.title,
      description: formVal.description,
      type: formVal.type,
      priority: formVal.priority,
      project: formVal.project,
      labels: formVal.labels || [],
    };

    if (formVal.assignee) {
      payload.assignee = formVal.assignee;
    } else {
      payload.assignee = null;
    }

    if (formVal.dueDate) {
      payload.dueDate = formVal.dueDate;
    } else {
      payload.dueDate = null;
    }

    if (this.isEditMode) {
      this.issueService.updateIssue(this.issueId, payload).subscribe({
        next: () => {
          this.router.navigate(['/issues']);
        },
        error: (err) => {
          console.error(err);
          alert(err?.error?.message || 'Failed to update issue.');
          this.loading = false;
        },
      });
    } else {
      this.issueService.createIssue(payload).subscribe({
        next: () => {
          this.router.navigate(['/issues']);
        },
        error: (err) => {
          console.error(err);
          alert(err?.error?.message || 'Failed to create issue.');
          this.loading = false;
        },
      });
    }
  }
}
