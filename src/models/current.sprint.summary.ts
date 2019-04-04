import {ProjectTotal} from "src/models/project.total";

export type CurrentSprintSummary = {
  startDate: Date;
  endDate: Date;
  projectsTotal: Array<ProjectTotal>;
};
