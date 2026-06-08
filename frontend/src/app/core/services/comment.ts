/**
 * comment.ts
 *
 * WHY:
 * Handles all comment-related API calls.
 * Comments are nested under issues: /issues/:issueId/comments
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from './api.config';
import { Comment } from '../models/comment.model';

interface CommentListResponse {
  success: boolean;
  results: number;
  data: Comment[];
}

interface CommentResponse {
  success: boolean;
  data: Comment;
}

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  /**
   * Get all comments for an issue.
   */
  getComments(issueId: string): Observable<CommentListResponse> {
    return this.http.get<CommentListResponse>(`${API_BASE_URL}/issues/${issueId}/comments`);
  }

  /**
   * Add a comment to an issue.
   * body: comment text, parent: optional parent comment ID for threading.
   */
  addComment(issueId: string, body: string, parent: string | null = null): Observable<CommentResponse> {
    return this.http.post<CommentResponse>(`${API_BASE_URL}/issues/${issueId}/comments`, { body, parent });
  }

  /**
   * Update a comment. Only author can edit.
   */
  updateComment(issueId: string, commentId: string, body: string): Observable<CommentResponse> {
    return this.http.patch<CommentResponse>(`${API_BASE_URL}/issues/${issueId}/comments/${commentId}`, { body });
  }

  /**
   * Delete a comment. Only author can delete.
   */
  deleteComment(issueId: string, commentId: string): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/issues/${issueId}/comments/${commentId}`);
  }
}
