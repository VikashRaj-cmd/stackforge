/**
 * app.component.ts
 *
 * WHY:
 * Root component of Angular application.
 * It only acts as the shell where routed pages are rendered.
 */

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'Issue Tracker';

  constructor(private themeService: ThemeService) {
    this.themeService.initializeTheme();
  }
}