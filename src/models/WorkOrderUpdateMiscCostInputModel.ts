/** the Work Order Add Misc Cost Update Model */
export interface WorkOrderUpdateMiscCostInputModel {
  /** The vendor id */
  VendorId?: number;
  /** The estimated cost of labor */
  EstimatedLaborCosts?: number;
  /** The estimated cost of materials */
  EstimatedMaterialCosts?: number;
  /** The actual cost of labor */
  ActualLaborCosts?: number;
  /** The actual cost of materials */
  ActualMaterialCosts?: number;
  /** the id of the work order cost. */
  Id?: number;
  /** the name of the cost */
  Name?: string;
  /** the notes about the cost amount */
  Note?: string;
}
