import {Component, Input, OnInit} from '@angular/core';

import {Observable} from "rxjs";

import {ProjectTotal} from "src/models/project.total";
import {CurrentSprintSummary} from "src/models/current.sprint.summary";

@Component({
	selector: 'cl-total-for-current-sprint',
	templateUrl: `total.for.current.sprint.component.html`,
  styleUrls: ['./total.for.current.sprint.component.scss']
})
export class TotalForCurrentSprintComponent implements OnInit {

  @Input('summary')
  summary$: Observable<CurrentSprintSummary>;

  projectsTotal: Array<ProjectTotal>;

	constructor() {

	}

	ngOnInit() {
	  this.summary$
      .subscribe((summary: CurrentSprintSummary) => this.projectsTotal = summary.projectsTotal);
	}

	calcRemainingTime(project: ProjectTotal): number {
	  return project.planned - project.total;
  }

}
