// Project model
/**
 * project.model.ts
 *
 * WHY:
 * Defines Project and ProjectMember data structure.
 */

import { User } from './user.model';

export interface ProjectMember {
  user: string | User;
  role: 'owner' | 'maintainer' | 'developer' | 'viewer';
}

export interface Project {
  _id: string;
  title: string;
  description?: string;
  owner: string | User;
  status: 'active' | 'archived';
  members: ProjectMember[];
  createdAt?: string;
  updatedAt?: string;
}