/**
 * issue.ts
 *
 * WHY:
 * Handles all issue-related backend API calls.
 * Covers CRUD, status update, assignment, and activity log.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from './api.config';
import { Issue } from '../models/issue.model';

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface IssueListResponse {
  success: boolean;
  meta?: PaginationMeta;
  results?: number;
  data: Issue[];
}

interface IssueResponse {
  success: boolean;
  data: Issue;
}

interface IssuePayload {
  title: string;
  description?: string;
  type: string;
  priority: string;
  project: string;
  assignee?: string;
  labels?: string[];
  dueDate?: string;
}

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  constructor(private http: HttpClient) {}

  /**
   * Get issues with optional query string filters.
   * e.g. ?status=open&project=xxx&page=1&limit=10
   */
  getIssues(query = ''): Observable<IssueListResponse> {
    return this.http.get<IssueListResponse>(`${API_BASE_URL}/issues${query}`);
  }

  /**
   * Get single issue by ID with full population.
   */
  getIssue(id: string): Observable<IssueResponse> {
    return this.http.get<IssueResponse>(`${API_BASE_URL}/issues/${id}`);
  }

  /**
   * Create a new issue.
   */
  createIssue(data: IssuePayload): Observable<IssueResponse> {
    return this.http.post<IssueResponse>(`${API_BASE_URL}/issues`, data);
  }

  /**
   * Update issue fields (title, description, priority, dueDate, labels).
   */
  updateIssue(id: string, data: Partial<IssuePayload>): Observable<IssueResponse> {
    return this.http.patch<IssueResponse>(`${API_BASE_URL}/issues/${id}`, data);
  }

  /**
   * Delete issue. Only the reporter can delete.
   */
  deleteIssue(id: string): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/issues/${id}`);
  }

  /**
   * Update issue status.
   * Only reporter or assignee can change status.
   */
  updateStatus(id: string, status: string): Observable<IssueResponse> {
    return this.http.patch<IssueResponse>(`${API_BASE_URL}/issues/${id}/status`, { status });
  }

  /**
   * Assign issue to a user.
   */
  assignIssue(id: string, assigneeId: string): Observable<IssueResponse> {
    return this.http.patch<IssueResponse>(`${API_BASE_URL}/issues/${id}/assign`, { assigneeId });
  }

  /**
   * Get activity log for an issue.
   */
  getActivity(id: string): Observable<any> {
    return this.http.get<any>(`${API_BASE_URL}/issues/${id}/activity`);
  }
}
