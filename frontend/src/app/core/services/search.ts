/**
 * search.ts
 *
 * WHY:
 * Coordination service to search across Projects, Issues, Users, and Labels.
 * Since Labels are project-scoped, it fetches labels across all projects in parallel.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { API_BASE_URL } from './api.config';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  /**
   * Search all entities matching query.
   */
  searchAll(query: string): Observable<{
    projects: any[];
    issues: any[];
    users: any[];
    labels: any[];
  }> {
    if (!query || !query.trim()) {
      return of({ projects: [], issues: [], users: [], labels: [] });
    }

    const cleanQuery = query.trim().toLowerCase();

    // 1. Projects Search
    const projects$ = this.http.get<any>(`${API_BASE_URL}/projects`).pipe(
      map((res) =>
        (res.data || []).filter(
          (p: any) =>
            (p.title && p.title.toLowerCase().includes(cleanQuery)) ||
            (p.description && p.description.toLowerCase().includes(cleanQuery))
        )
      ),
      catchError(() => of([]))
    );

    // 2. Issues Search
    const issues$ = this.http
      .get<any>(`${API_BASE_URL}/issues?search=${encodeURIComponent(cleanQuery)}`)
      .pipe(
        map((res) => res.data || []),
        catchError(() => of([]))
      );

    // 3. Users Search
    const users$ = this.http.get<any>(`${API_BASE_URL}/users`).pipe(
      map((res) =>
        (res.data || []).filter(
          (u: any) =>
            (u.name && u.name.toLowerCase().includes(cleanQuery)) ||
            (u.email && u.email.toLowerCase().includes(cleanQuery))
        )
      ),
      catchError(() => of([]))
    );

    // 4. Labels Search (fetches projects first, then gets labels for each project)
    const labels$ = this.http.get<any>(`${API_BASE_URL}/projects`).pipe(
      switchMap((res: any) => {
        const projects = res.data || [];
        if (projects.length === 0) return of([]);

        const labelRequests: Observable<any[]>[] = projects.map((p: any) =>
          this.http.get<any>(`${API_BASE_URL}/projects/${p._id}/labels`).pipe(
            map((lRes) =>
              (lRes.data || []).map((l: any) => ({
                ...l,
                projectTitle: p.title,
                projectId: p._id,
              }))
            ),
            catchError(() => of([]))
          )
        );

        return forkJoin(labelRequests).pipe(
          map((results: any[][]) => {
            const allLabels = results.reduce((acc, curr) => acc.concat(curr), []);
            const seen = new Set();
            return allLabels.filter((l: any) => {
              const matches = l.name && l.name.toLowerCase().includes(cleanQuery);
              if (!matches) return false;
              const key = `${l.name}-${l.color}`;
              if (seen.has(key)) return false;
              seen.add(key);
              return true;
            });
          })
        );
      }),
      catchError(() => of([]))
    );

    return forkJoin({
      projects: projects$,
      issues: issues$,
      users: users$,
      labels: labels$,
    });
  }
}
