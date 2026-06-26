import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './loading-spinner.html',
  styleUrl: './loading-spinner.css',
})
export class LoadingSpinner {
  @Input() message = 'Loading...';
  @Input() diameter = 40;
  @Input() overlay = false;
}
