/**
 * notification.ts
 *
 * WHY:
 * Represents a notification shown
 * inside notification center.
 */

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}
