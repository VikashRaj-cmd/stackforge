/**
 * notification.ts
 *
 * WHY:
 * Handles notification data.
 *
 * Currently uses local mock data.
 * Can later connect with backend.
 */

import { Injectable } from '@angular/core';
import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications: Notification[] = [
    {
      id: '1',
      title: 'Issue Assigned',
      message: 'A new issue has been assigned to you.',
      read: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Project Updated',
      message: 'Project details were updated.',
      read: false,
      createdAt: new Date().toISOString(),
    },
  ];

  getNotifications(): Notification[] {
    return this.notifications;
  }

  markAsRead(id: string): void {
    const notification = this.notifications.find(
      (item) => item.id === id
    );

    if (notification) {
      notification.read = true;
    }
  }

  unreadCount(): number {
    return this.notifications.filter(
      (item) => !item.read
    ).length;
  }
}
