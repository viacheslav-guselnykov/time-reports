import {TimeEntry} from "src/models/time.entry";

export type Summary = {
  timeEntries: Array<TimeEntry>;
  projectAndTotalTime: ProjectAndTotalTime;
};

export type ProjectAndTotalTime = {
  [projectId: string]: ClockifyProjectTotal
};

export type ClockifyProjectTotal = {
  duration: string;
  projectName: string;
  projectColor: string;
};
