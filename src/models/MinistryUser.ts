/** This service allows you to retrieve all Ministry users. */
export interface MinistryUser {
  /** The id of the editor */
  Id?: number;
  /** The first name of the user. */
  FirstName?: string;
  /** The last name of the user. */
  LastName?: string;
  /** The email address of the user. */
  Email?: string;
  /** User Roles */
  Roles?: string[];
}
