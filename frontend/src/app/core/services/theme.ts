/**
 * theme.ts
 *
 * WHY:
 * Handles application theme.
 * Supports:
 * - Light Theme
 * - Dark Theme
 * - LocalStorage persistence
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themeKey = 'app-theme';

  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  /**
   * Apply saved theme.
   */
  initializeTheme(): void {
    if (!this.isBrowser()) return;
    const savedTheme =
      localStorage.getItem(this.themeKey) ||
      'light';

    this.applyTheme(savedTheme);
  }

  /**
   * Toggle theme.
   */
  toggleTheme(): void {
    if (!this.isBrowser()) return;
    const currentTheme =
      localStorage.getItem(this.themeKey) ||
      'light';

    const nextTheme =
      currentTheme === 'light'
        ? 'dark'
        : 'light';

    this.applyTheme(nextTheme);
  }

  /**
   * Apply theme.
   */
  applyTheme(theme: string): void {
    if (!this.isBrowser()) return;
    document.body.classList.remove(
      'light-theme',
      'dark-theme'
    );

    document.body.classList.add(
      `${theme}-theme`
    );

    localStorage.setItem(
      this.themeKey,
      theme
    );
  }

  /**
   * Current theme.
   */
  getCurrentTheme(): string {
    if (!this.isBrowser()) return 'light';
    return (
      localStorage.getItem(this.themeKey) ||
      'light'
    );
  }
}
