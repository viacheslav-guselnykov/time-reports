import { Injectable } from '@angular/core';

import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {Summary} from "src/models/summary";
import {SummaryReportEndpoint} from "src/endpoints/reports/summary/SummaryReportEndpoint";
import {Project} from "src/models/project";
import {SummaryReportQuery} from "src/models/summary.report.query";
import {DateOperations} from "src/utils/date.operations";
import {LastDaySummary} from "src/models/last.day.summary";
import {WorkspaceMember} from "src/models/workspace.member";
import {TimeEntry} from "src/models/time.entry";
import {MemberTotal} from "src/models/member.total";

@Injectable()
export class LastDaySummaryFetcher {

	constructor(private summaryEndpoint: SummaryReportEndpoint) {
	}

	fetchLastDaySummary(projects: Array<Project>, workspaceMembers: Array<WorkspaceMember>): Observable<LastDaySummary> {
    const startDate = this.getStartDate();
    const endDate = this.getEndDate(startDate);

    const reportQuery = new SummaryReportQuery();
    reportQuery.startDate = startDate.toISOString();
    reportQuery.endDate = endDate.toISOString();

    const projectIds = projects.map((project: Project) => project.id);
    reportQuery.projectIds = projectIds;

    return this.summaryEndpoint.fetchSummary(reportQuery)
      .pipe(
        map((summary: Summary) => {
          return {
            day: startDate,
            membersTotal: this.toMembersTotal(summary.timeEntries, workspaceMembers)
          };
        })
      );
  }

  private getStartDate(): Date {
    let startDate: Date;

    const yesterday = this.getYesterdayDate();
    const isSaturday = yesterday.getDay() === 6;
    const isSunday = yesterday.getDay() === 0;

    if (isSaturday) {
      startDate = DateOperations.decrementDays(yesterday, 1);
    } else if (isSunday) {
      startDate = DateOperations.decrementDays(yesterday, 2);
    } else {
      startDate = new Date(yesterday);
    }

    return this.setCustomHours(startDate);

  }

  private getEndDate(startDate: Date): Date {
    return this.setCustomHours(DateOperations.incrementDays(startDate, 1));
  }

  private getYesterdayDate(): Date {
    const date = new Date();
    date.setDate(date.getDate()-1);
    return date;
  }

  private setCustomHours(date: Date): Date {
    const newDate = new Date(date);
    newDate.setHours(10);
    newDate.setMinutes(0);
    newDate.setSeconds(0);
    return newDate; // 10AM
  }

  private toMembersTotal(timeEntries: Array<TimeEntry>, workspaceMembers: Array<WorkspaceMember>): Array<MemberTotal> {

    const timeEntriesAvailable = !!Object.keys(timeEntries).length;

    if (!timeEntriesAvailable)
      return workspaceMembers.map((member: WorkspaceMember) => {
        return {
          member: member,
          hasTimeEntries: false
        };
      });

    return workspaceMembers.map((member: WorkspaceMember) => {
      return {
        member: member,
        hasTimeEntries: timeEntries.filter((timeEntry: TimeEntry) => {
          return timeEntry.user.id === member.id;
        }).length > 0
      };
    });

  }

}
