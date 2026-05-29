/**
 * project.ts
 *
 * WHY:
 * This service handles all project-related API calls.
 * Dashboard uses it to fetch project count.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from './api.config';
import { Project } from '../models/project.model';

interface ProjectListResponse {
  success: boolean;
  results?: number;
  data: Project[];
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  /**
   * Get all active projects from backend.
   */
  getProjects(): Observable<ProjectListResponse> {
    return this.http.get<ProjectListResponse>(`${API_BASE_URL}/projects`);
  }
}