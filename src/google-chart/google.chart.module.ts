import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {GoogleChartComponent} from "src/google-chart/google.chart.component";
import {GoogleChartService} from "src/google-chart/google.chart.service";

const declarations = [
  GoogleChartComponent
];

@NgModule({
	imports: [
		CommonModule
	],
	declarations: declarations,
	providers: [
		GoogleChartService
	],
	exports: declarations
})
export class GoogleChartModule {
}
