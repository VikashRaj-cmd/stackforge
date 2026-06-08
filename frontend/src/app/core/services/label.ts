/**
 * label.ts
 *
 * WHY:
 * Handles all label-related API calls.
 * Labels are project-scoped: /projects/:projectId/labels
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from './api.config';
import { Label } from '../models/label.model';

interface LabelListResponse {
  success: boolean;
  results: number;
  data: Label[];
}

interface LabelResponse {
  success: boolean;
  data: Label;
}

interface LabelPayload {
  name: string;
  color: string;
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LabelService {
  constructor(private http: HttpClient) {}

  /**
   * Get all labels for a project.
   */
  getLabels(projectId: string): Observable<LabelListResponse> {
    return this.http.get<LabelListResponse>(`${API_BASE_URL}/projects/${projectId}/labels`);
  }

  /**
   * Create a label for a project.
   */
  createLabel(projectId: string, data: LabelPayload): Observable<LabelResponse> {
    return this.http.post<LabelResponse>(`${API_BASE_URL}/projects/${projectId}/labels`, data);
  }

  /**
   * Update a label.
   */
  updateLabel(projectId: string, labelId: string, data: Partial<LabelPayload>): Observable<LabelResponse> {
    return this.http.patch<LabelResponse>(`${API_BASE_URL}/projects/${projectId}/labels/${labelId}`, data);
  }

  /**
   * Delete a label.
   */
  deleteLabel(projectId: string, labelId: string): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/projects/${projectId}/labels/${labelId}`);
  }
}
