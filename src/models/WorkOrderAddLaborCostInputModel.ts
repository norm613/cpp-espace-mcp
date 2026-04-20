/** The Work Order Add Labor Cost Input Model */
export interface WorkOrderAddLaborCostInputModel {
  /** Date the work was performed */
  DateOfWork?: string;
  /** the member id of the person who performed or assigned the work */
  MemberId: number;
  /** the number of minutes the work should take */
  Minutes: number;
  /** the hourly rate */
  HourlyRate?: number;
  /** the description of work */
  DescriptionOfWork?: string;
  /** the name of the cost */
  Name?: string;
  /** the notes about the cost amount */
  Note?: string;
  /** the date the cost was created */
  CreationDate?: string;
}
