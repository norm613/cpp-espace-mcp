/** the work order add vehicle cost input model */
export interface WorkOrderAddVehicleCostInputModel {
  /** the vehicle id */
  VehicleId?: number;
  /** the equipment id to be added to the work order */
  EquipmentId?: number;
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
