import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

import {WorkspaceMembersEndpoint} from "src/endpoints/workspace-members/WorkspaceMembersEndpoint";
import {ProjectsEndpoint} from "src/endpoints/projects/ProjectsEndpoint";
import {SummaryReportEndpoint} from "src/endpoints/reports/summary/SummaryReportEndpoint";

const providers = [
  WorkspaceMembersEndpoint,
  ProjectsEndpoint,
  SummaryReportEndpoint
];

@NgModule({
	imports: [
		CommonModule,
    HttpClientModule
	],
	declarations: [

	],
	exports: [

	]
})
export class EndpointsModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: EndpointsModule,
      providers: providers
    };
  }

}
