/**
 * project.ts
 *
 * WHY:
 * Handles all project-related backend API calls.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { API_BASE_URL } from './api.config';

interface ProjectPayload {
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  /**
   * Get all projects.
   */
  getProjects(): Observable<any> {
    return this.http.get(`${API_BASE_URL}/projects`);
  }

  /**
   * Get single project.
   */
  getProject(id: string): Observable<any> {
    return this.http.get(`${API_BASE_URL}/projects/${id}`);
  }

  /**
   * Create project.
   */
  createProject(data: ProjectPayload): Observable<any> {
    return this.http.post(`${API_BASE_URL}/projects`, data);
  }

  /**
   * Update project.
   */
  updateProject(
    id: string,
    data: Partial<ProjectPayload>
  ): Observable<any> {
    return this.http.patch(
      `${API_BASE_URL}/projects/${id}`,
      data
    );
  }

  /**
   * Delete project.
   */
  deleteProject(id: string): Observable<any> {
    return this.http.delete(
      `${API_BASE_URL}/projects/${id}`
    );
  }

  /**
   * Add member.
   */
  addMember(
    projectId: string,
    userId: string
  ): Observable<any> {
    return this.http.post(
      `${API_BASE_URL}/projects/${projectId}/members`,
      {
        userId,
        role: 'developer',
      }
    );
  }

  /**
   * Remove member.
   */
  removeMember(
    projectId: string,
    userId: string
  ): Observable<any> {
    return this.http.delete(
      `${API_BASE_URL}/projects/${projectId}/members/${userId}`
    );
  }
}