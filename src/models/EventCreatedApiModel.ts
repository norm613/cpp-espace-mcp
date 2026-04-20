/** The response for a succesful event create. */
export interface EventCreatedApiModel {
  /** The id of the new event. */
  EventId?: number;
  /** The id of the new schedule. */
  ScheduleId?: number;
  /** The namne of the new schedule. */
  ScheduleName?: string;
  /** The id of the new occurrence. */
  OccurrenceId?: number;
  /** The status of the new event. */
  Status?: string;
}
