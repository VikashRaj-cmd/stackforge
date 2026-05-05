// User model
/**
 * user.model.ts
 *
 * WHY:
 * Defines the shape of User data coming from backend.
 */

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'member';
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}