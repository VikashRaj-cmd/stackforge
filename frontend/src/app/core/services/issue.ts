/**
 * issue.ts
 *
 * WHY:
 * This service handles all issue-related API calls.
 * Dashboard uses it to fetch issue count and recent issues.
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

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  constructor(private http: HttpClient) {}

  /**
   * Get issues with optional query string.
   * Example query:
   * ?status=open&page=1&limit=10
   */
  getIssues(query = ''): Observable<IssueListResponse> {
    return this.http.get<IssueListResponse>(`${API_BASE_URL}/issues${query}`);
  }
}