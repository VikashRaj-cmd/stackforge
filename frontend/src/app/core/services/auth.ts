/**
 * auth.service.ts
 *
 * WHY:
 * Handles authentication API calls:
 * - register
 * - login
 * - logout
 * - save JWT token
 * - read current auth state
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { API_BASE_URL } from './api.config';
import { User } from '../models/user.model';

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  token?: string;
  data?: User;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'issue_tracker_token';
  private readonly userKey = 'issue_tracker_user';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Register user using backend API.
   */
  register(payload: RegisterPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_BASE_URL}/auth/register`, payload);
  }

  /**
   * Login user and save token/user in localStorage.
   */
  login(payload: LoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_BASE_URL}/auth/login`, payload).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token);
        }

        if (response.data) {
          localStorage.setItem(this.userKey, JSON.stringify(response.data));
        }
      })
    );
  }

  /**
   * Get JWT token from localStorage.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Check whether user is logged in.
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Get stored user data.
   */
  getStoredUser(): User | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  /**
   * Logout user from frontend.
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/login']);
  }
}