import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.css',
})
export class EmptyState {
  @Input() icon = 'folder_off';
  @Input() title = 'No Data Found';
  @Input() message = '';
  @Input() actionText = '';
  @Input() actionRoute = '';

  @Output() actionClick = new EventEmitter<void>();

  onAction(): void {
    this.actionClick.emit();
  }
}
