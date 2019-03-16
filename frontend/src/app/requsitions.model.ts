export interface Requisition {
  diner : String,
  date : Date,
  orders : {},
  status : String,
  approvedBy : String,
  dateApproved : Date,
  observations: String,
  approvalObservations: String,
  requisitionOrig : []
}
