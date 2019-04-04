import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberEntriesForDayComponent } from "./member.entries.for.day.component";

const declarations = [
  MemberEntriesForDayComponent
];

@NgModule({
	imports: [
		CommonModule
	],
	declarations: declarations,
	providers: [

	],
	exports: declarations
})
export class MemberEntriesForDayModule {
}
