import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-table-toolbar',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule],
  templateUrl: './table-toolbar.html',
  styleUrl: './table-toolbar.css',
})
export class TableToolbar {
  @Input() searchPlaceholder = 'Search...';
  @Input() searchValue = '';
  @Input() showSearch = true;
  @Input() showRefresh = true;

  @Output() searchValueChange = new EventEmitter<string>();
  @Output() refresh = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();

  onSearchChange(value: string): void {
    this.searchValue = value;
    this.searchValueChange.emit(value);
  }

  onRefresh(): void {
    this.refresh.emit();
  }

  onReset(): void {
    this.searchValue = '';
    this.searchValueChange.emit('');
    this.reset.emit();
  }
}
