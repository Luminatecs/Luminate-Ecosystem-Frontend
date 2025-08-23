/**
 * Base Entity Model
 * Provides common fields for all entities in the application
 */
export interface BaseEntity {
  /**
   * Unique identifier for the entity
   * Nullable for new entities that haven't been persisted yet
   */
  id?: string | null;

  /**
   * User ID or identifier of who created this entity
   * Nullable for system-generated or anonymous entities
   */
  createdBy?: string | null;

  /**
   * Timestamp when the entity was created
   * Nullable for entities that don't track creation time
   */
  createdDate?: Date | null;
}

/**
 * Extended Base Entity with additional audit fields
 * Use this for entities that need full audit trail
 */
export interface AuditableEntity extends BaseEntity {
  /**
   * User ID or identifier of who last modified this entity
   */
  modifiedBy?: string | null;

  /**
   * Timestamp when the entity was last modified
   */
  modifiedDate?: Date | null;
}
