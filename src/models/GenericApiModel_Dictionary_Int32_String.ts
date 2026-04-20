/** Returns Generic Model. */
export interface GenericApiModel_Dictionary_Int32_String {
  /** Status code of the request */
  IsSuccessStatusCode?: boolean;
  /** Friendly message if the response code != 200 */
  Message?: string;
  /** Generic Data Model */
  Data?: Record<string, unknown>;
  /** Shelby Arena integration */
  IsUsingShelbyArenaAdvancedIntegration?: boolean;
}
