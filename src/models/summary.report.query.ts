export class SummaryReportQuery {
  startDate: string = "2019-04-01T00:00:00.000Z";
  endDate: string = "2019-04-13T00:00:00.000Z";
  me: boolean = false;
  userGroupIds: Array<string> = [];
  userIds: Array<string> = [];
  projectIds: Array<string> = [];
  clientIds: Array<string> = [];
  taskIds: Array<string> = [];
  tagIds: Array<string> = [];
  billable: string = "BOTH";
  includeTimeEntries: boolean = true;
  zoomLevel: string = "month";
  description: string = "";
  archived: string = "Active";
  roundingOn: boolean = false;
}
