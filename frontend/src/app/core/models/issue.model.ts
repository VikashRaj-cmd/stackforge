// Issue model
/**
 * issue.model.ts
 *
 * WHY:
 * Defines Issue object used across issue list, detail, filters, and forms.
 */

import { User } from './user.model';
import { Project } from './project.model';
import { Label } from './label.model';

export type IssueType = 'bug' | 'feature' | 'task' | 'improvement';
export type IssueStatus = 'open' | 'in-progress' | 'in-review' | 'resolved' | 'closed';
export type IssuePriority = 'critical' | 'high' | 'medium' | 'low';

export interface Issue {
  _id: string;
  title: string;
  description?: string;
  type: IssueType;
  status: IssueStatus;
  priority: IssuePriority;
  project: string | Project;
  reporter: string | User;
  assignee?: string | User | null;
  labels?: Array<string | Label>;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}