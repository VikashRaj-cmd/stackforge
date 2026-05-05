// Label model
/**
 * label.model.ts
 *
 * WHY:
 * Defines label/tag structure for project-scoped issue labels.
 */

export interface Label {
  _id: string;
  name: string;
  color: string;
  description?: string;
  project: string;
  createdAt?: string;
  updatedAt?: string;
}