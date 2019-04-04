import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";

import {DatePickerComponent} from "src/date-picker/date.picker.component";

const declarations = [
  DatePickerComponent
];

@NgModule({
	imports: [
		CommonModule,
    ReactiveFormsModule
	],
	declarations: declarations,
	exports: declarations
})
export class DatePickerModule {
}
