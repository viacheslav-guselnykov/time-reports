import {Injectable} from "@angular/core";

import {Summary} from "src/models/summary";
import {ProjectTotal} from "src/models/project.total";
import {TotalTimePipe} from "src/pipes/total.time.pipe";
import {MeetingsProjectTotalParser} from "src/summary/current-sprint-summary/MeetingsProjectTotalParser";
import {Time} from "src/models/time";

@Injectable()
export class ProjectTotalParser {

  private static bugFixingProjectId: string = '5c066bf8b0798723e0fb1136';

  constructor(private totalTimePipe: TotalTimePipe) {}

  fromSummary(summary: Summary, membersCount: number): Array<ProjectTotal> {

    const projectAndTotalTime = summary.projectAndTotalTime;

    return Object.keys(projectAndTotalTime).map((projectId: string) => {

      const projectTotalObj = projectAndTotalTime[projectId];

      let projectTotalTime: number;

      if (projectId === MeetingsProjectTotalParser.meetingsProjectId) {
        const totalTime: Time = MeetingsProjectTotalParser.fromSummary(summary, membersCount);
        projectTotalTime = totalTime.hours;
      } else {
        projectTotalTime = this.toHours(projectTotalObj.duration);
      }

      return {
        id: projectId,
        name: projectTotalObj.projectName,
        planned: this.getPlannedTime(projectId),
        total: projectTotalTime
      };

    })
  }

  private toHours(value: string): number {
    return this.totalTimePipe.transform(value);
  }

  private fromManDays(md: number): number {
    return md * 8;
  }

  private getPlannedTime(projectId: string): number {
    switch (projectId) {

      case MeetingsProjectTotalParser.meetingsProjectId: {
        return this.fromManDays(8);
      }

      case ProjectTotalParser.bugFixingProjectId: {
        return this.fromManDays(20);
      }

      default: {
        return 0;
      }

    }
  }

}
