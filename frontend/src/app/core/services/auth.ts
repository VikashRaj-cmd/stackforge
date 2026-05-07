/**
 * auth.service.ts
 *
 * WHY:
 * Handles authentication API calls and JWT token storage.
 * Other parts of app use this service to check login status.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { API_BASE_URL } from './api.config';
import { User } from '../models/user.model';

interface LoginBody {
  email: string;
  password: string;
}

interface RegisterBody {
  name: string;
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

  constructor(private http: HttpClient) {}

  /**
   * Check if running in browser (SSR safe)
   */
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  /**
   * Register a new user using backend register API.
   */
  register(data: RegisterBody): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_BASE_URL}/auth/register`, data);
  }

  /**
   * Login user and save JWT token + user data.
   */
  login(data: LoginBody): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_BASE_URL}/auth/login`, data).pipe(
      tap((res) => {
        if (!this.isBrowser()) return;

        if (res.token) {
          localStorage.setItem(this.tokenKey, res.token);
        }

        if (res.data) {
          localStorage.setItem(this.userKey, JSON.stringify(res.data));
        }
      })
    );
  }

  /**
   * Get current user profile from backend.
   */
  getMe(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${API_BASE_URL}/auth/me`);
  }

  /**
   * Get saved JWT token.
   */
  getToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Get saved user from localStorage.
   */
  getCurrentUser(): User | null {
    if (!this.isBrowser()) return null;

    const user = localStorage.getItem(this.userKey);

    if (!user) {
      return null;
    }

    return JSON.parse(user) as User;
  }

  /**
   * Check whether user is logged in.
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Logout user locally.
   */
  logout(): void {
    if (!this.isBrowser()) return;

    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }
}