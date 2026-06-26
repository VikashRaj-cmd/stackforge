import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-error-state',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './error-state.html',
  styleUrl: './error-state.css',
})
export class ErrorState {
  @Input() message = 'Something went wrong.';

  @Output() retry = new EventEmitter<void>();

  onRetry(): void {
    this.retry.emit();
  }
}
