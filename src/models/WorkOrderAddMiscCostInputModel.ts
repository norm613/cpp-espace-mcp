/** the Work Order Add Misc Cost Input Model */
export interface WorkOrderAddMiscCostInputModel {
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
  /** the name of the cost */
  Name?: string;
  /** the notes about the cost amount */
  Note?: string;
  /** the date the cost was created */
  CreationDate?: string;
}
