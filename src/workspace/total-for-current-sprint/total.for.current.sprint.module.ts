import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TotalForCurrentSprintComponent} from "src/workspace/total-for-current-sprint/total.for.current.sprint.component";
import {CustomPipes} from "src/pipes/custom.pipes";
import {GoogleChartModule} from "src/google-chart/google.chart.module";

const declarations = [
  TotalForCurrentSprintComponent
];

@NgModule({
	imports: [
		CommonModule,

    CustomPipes,
    GoogleChartModule
	],
	declarations: declarations,
	exports: declarations
})
export class TotalForCurrentSprintModule {
}
