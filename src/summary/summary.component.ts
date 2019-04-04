import {Component, OnInit} from '@angular/core';

import {combineLatest, Observable, ReplaySubject, Subject} from "rxjs";
import {switchMap, takeUntil} from "rxjs/operators";

import {WorkspaceMembersEndpoint} from "src/endpoints/workspace-members/WorkspaceMembersEndpoint";
import {ProjectsEndpoint} from "src/endpoints/projects/ProjectsEndpoint";

import {LastDaySummaryFetcher} from "src/summary/last-day-summary/last.day.summary.fetcher";
import {CurrentSprintSummaryFetcher} from "src/summary/current-sprint-summary/current.sprint.summary.fetcher";

import {WorkspaceMember} from "src/models/workspace.member";
import {Project} from "src/models/project";

import {LastDaySummary} from "src/models/last.day.summary";
import {CurrentSprintSummary} from "src/models/current.sprint.summary";

@Component({
	selector: 'cl-summary',
	templateUrl: `summary.component.html`,
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  workspaceMembers$: ReplaySubject<Array<WorkspaceMember>> = new ReplaySubject();
  projects$: ReplaySubject<Array<Project>> = new ReplaySubject();

  currentSprintStartDate$: ReplaySubject<Date> = new ReplaySubject();

  lastDaySummary$: Observable<LastDaySummary>;
  currentSprintSummary$: Observable<CurrentSprintSummary>;

  private destroy$: Subject<void> = new Subject<void>();

	constructor(private workspaceMembersEndpoint: WorkspaceMembersEndpoint,
              private projectsEndpoint: ProjectsEndpoint,
              private lastDaySummaryFetcher: LastDaySummaryFetcher,
              private currentSprintSummaryFetcher: CurrentSprintSummaryFetcher) {
	}

	ngOnInit() {
    this.fetchProjects();
    this.fetchWorkspaceMembers();

    this.fetchLastDaySummary();
    this.fetchCurrentSprintSummary();
  }

  onSprintStartDateChange(sprintStartDate: Date): void {
    this.currentSprintStartDate$.next(sprintStartDate);
  }

  private fetchProjects(): void {
    this.projectsEndpoint.fetchProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe((projects: Array<Project>) => {
        this.projects$.next(projects);
      });
  }

  private fetchWorkspaceMembers(): void {
    this.workspaceMembersEndpoint.fetchMembers()
      .subscribe((members) => {
        this.workspaceMembers$.next(members);
      });
  }

  private fetchLastDaySummary(): void {
    this.lastDaySummary$ = combineLatest(
      this.projects$.asObservable(),
      this.workspaceMembers$.asObservable()
    ).pipe(
      switchMap((data: any) => {
        const projects = data[0];
        const workspaceMembers = data[1];
        return this.lastDaySummaryFetcher.fetchLastDaySummary(projects, workspaceMembers);
      })
    );
  }

  private fetchCurrentSprintSummary(): void {
    this.currentSprintSummary$ = combineLatest(
      this.projects$.asObservable(),
      this.currentSprintStartDate$.asObservable(),
      this.workspaceMembers$.asObservable()
    ).pipe(
        switchMap((data: any) => {
          const projects = data[0];
          const sprintStartDate = data[1];
          const workspaceMembers = data[2];
          return this.currentSprintSummaryFetcher.fetchCurrentSprintSummary(projects, sprintStartDate, workspaceMembers);
        })
      );
  }

}
