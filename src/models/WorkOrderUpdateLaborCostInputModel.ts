/** The Work Order Add Labor Cost Update Model */
export interface WorkOrderUpdateLaborCostInputModel {
  /** Date the work was performed */
  DateOfWork?: string;
  /** the member id of the person who performed or assigned the work */
  MemberId?: number;
  /** the estimated labor cost */
  EstimatedLaborCost?: number;
  /** the hourly rate */
  HourlyRate?: number;
  /** the description of work */
  DescriptionOfWork?: string;
  /** the id of the work order cost. */
  Id?: number;
  /** the name of the cost */
  Name?: string;
  /** the notes about the cost amount */
  Note?: string;
}
