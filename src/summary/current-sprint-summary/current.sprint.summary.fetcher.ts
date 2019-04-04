import { Injectable } from '@angular/core';

import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {DateOperations} from "src/utils/date.operations";

import {CurrentSprintSummary} from "src/models/current.sprint.summary";
import {SummaryReportEndpoint} from "src/endpoints/reports/summary/SummaryReportEndpoint";
import {SummaryReportQuery} from "src/models/summary.report.query";
import {Project} from "src/models/project";
import {Summary} from "src/models/summary";
import {ProjectTotalParser} from "src/summary/current-sprint-summary/ProjectTotalParser";
import {WorkspaceMember} from "src/models/workspace.member";

@Injectable()
export class CurrentSprintSummaryFetcher {

	constructor(private summaryEndpoint: SummaryReportEndpoint,
              private projectTotalParser: ProjectTotalParser) {
	}

	fetchCurrentSprintSummary(projects: Array<Project>, sprintStartDate: Date, workspaceMembers: Array<WorkspaceMember>): Observable<CurrentSprintSummary> {
    const startDate = sprintStartDate;
    const endDate = DateOperations.incrementDays(startDate, 14);

    const reportQuery = new SummaryReportQuery();
    reportQuery.startDate = startDate.toISOString();
    reportQuery.endDate = endDate.toISOString();

    const projectIds = projects.map((project: Project) => project.id);
    reportQuery.projectIds = projectIds;

    return this.summaryEndpoint.fetchSummary(reportQuery)
      .pipe(
        map((summary: Summary) => {
          return {
            startDate: startDate,
            endDate: endDate,
            projectsTotal: this.projectTotalParser.fromSummary(summary, workspaceMembers.length)
          };
        })
      );
  }

}
