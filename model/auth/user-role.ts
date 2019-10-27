export const enum UserRole {
  /** Super users may read and write to the database and infrastructure. */
  SUPER = 'SUPER',
  /**
   * Owners may read and write to the database and may read and write most infrastructure
   * data.
   */
  OWNER = 'OWNER',
  /** Administrators may read and write to the database. */
  ADMINISTRATOR = 'ADMINISTRATOR',
  /** The public may read and write some database collections. */
  PUBLIC = 'PUBLIC',
  /** Anonymous users may read some database collections. */
  ANONYMOUS = 'ANONYMOUS',
}
