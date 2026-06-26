import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './page-header.html',
  styleUrl: './page-header.css',
})
export class PageHeader {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() eyebrow = '';
  @Input() actionText = '';
  @Input() actionRoute = '';
  @Input() actionIcon = 'add';

  @Output() actionClick = new EventEmitter<void>();

  onAction(): void {
    this.actionClick.emit();
  }
}
