// Comment model
/**
 * comment.model.ts
 *
 * WHY:
 * Defines comment data for issue discussion section.
 */

import { User } from './user.model';

export interface Comment {
  _id: string;
  issue: string;
  author: string | User;
  body: string;
  parent?: string | null;
  createdAt?: string;
  updatedAt?: string;
}