/**
 * issue-form.ts
 *
 * WHY:
 * Handles issue creation and updating, dynamic project member retrieval.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { IssueService } from '../../../core/services/issue';
import { ProjectService } from '../../../core/services/project';

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

  constructor(
    private fb: FormBuilder,
    private issueService: IssueService,
    private projectService: ProjectService,
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
    });
  }

  ngOnInit(): void {
    this.loadProjects();

    this.issueId = this.route.snapshot.paramMap.get('id') || '';
    if (this.issueId) {
      this.isEditMode = true;
      this.loadIssue();
    }

    // Watch for project workspace change to populate corresponding members as assignees
    this.form.get('project')?.valueChanges.subscribe((projectId) => {
      if (projectId) {
        this.loadProjectMembers(projectId);
      } else {
        this.assignees = [];
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

  loadIssue(): void {
    this.loading = true;
    this.issueService.getIssue(this.issueId).subscribe({
      next: (res) => {
        const issue = res.data;
        const projectId = issue.project?._id || issue.project;
        
        this.loadProjectMembers(projectId, () => {
          this.form.patchValue({
            title: issue.title,
            description: issue.description || '',
            type: issue.type,
            priority: issue.priority,
            project: projectId,
            assignee: issue.assignee?._id || issue.assignee || '',
            dueDate: issue.dueDate ? new Date(issue.dueDate).toISOString().substring(0, 10) : '',
          });
          this.loading = false;
        });
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/issues']);
      },
    });
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
