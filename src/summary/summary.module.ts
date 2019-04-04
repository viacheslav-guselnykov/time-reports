import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SummaryComponent} from "./summary.component";

import { MemberEntriesForDayModule } from "src/workspace/member-entries-for-day/member.entries.for.day.module";
import {EndpointsModule} from 'src/endpoints/endpoints.module';
import {TotalForCurrentSprintModule} from "src/workspace/total-for-current-sprint/total.for.current.sprint.module";
import {DatePickerModule} from "src/date-picker/date.picker.module";

import {LastDaySummaryFetcher} from "src/summary/last-day-summary/last.day.summary.fetcher";
import {CurrentSprintSummaryFetcher} from "src/summary/current-sprint-summary/current.sprint.summary.fetcher";
import {CustomPipes} from "src/pipes/custom.pipes";
import {ProjectTotalParser} from "src/summary/current-sprint-summary/ProjectTotalParser";

const declarations = [
  SummaryComponent
];

@NgModule({
	imports: [
		CommonModule,

    MemberEntriesForDayModule,
    TotalForCurrentSprintModule,
    DatePickerModule,

    EndpointsModule.forRoot(),

    CustomPipes.forRoot()
	],
	declarations: declarations,
	providers: [
    LastDaySummaryFetcher,
    CurrentSprintSummaryFetcher,
    ProjectTotalParser
	],
	exports: declarations
})
export class SummaryModule {
}
