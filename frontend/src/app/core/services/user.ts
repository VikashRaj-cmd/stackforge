/**
 * user.ts
 *
 * WHY:
 * This service handles user-related API calls.
 * Dashboard uses it to fetch team member count.
 * Backend may allow this only for admin users.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from './api.config';
import { User } from '../models/user.model';

interface UserListResponse {
  success: boolean;
  results?: number;
  data: User[];
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  /**
   * Get all users from backend.
   * This may require admin role.
   */
  getUsers(): Observable<UserListResponse> {
    return this.http.get<UserListResponse>(`${API_BASE_URL}/users`);
  }
}