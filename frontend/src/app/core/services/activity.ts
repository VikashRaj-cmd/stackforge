/**
 * activity.ts
 *
 * WHY:
 * Handles activity log APIs.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_BASE_URL } from './api.config';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private http: HttpClient) {}

  /**
   * Get activity logs. Supports optional query parameters like actor or issue.
   */
  getActivityLogs(params?: { actor?: string; issue?: string }): Observable<any> {
    let httpParams = new HttpParams();
    if (params?.actor) {
      httpParams = httpParams.set('actor', params.actor);
    }
    if (params?.issue) {
      httpParams = httpParams.set('issue', params.issue);
    }

    return this.http.get(`${API_BASE_URL}/activity`, { params: httpParams });
  }
}
